import React from 'react';
import { getTemplateSchema, getTemplateRequest, getTemplateResponse, getTemplateCatalog} from "../utils/templateExcel";
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

class App extends React.Component {

    state = {
        list: [],
        schemas: [],
        responses: [],
        uris: [],
        name: null
    }

    handleFile = (e) => {
        let { files } = e.target;
        for (const file of files) {

            let reader = new FileReader();
                
            reader.onload = async (e) => {
                let content = reader.result;
                let schemas = await this.getSchemas(content);
                let uris = await this.getUris(content);
                let requests = await this.getRequest(content, schemas);
                let responses = await this.getResponse(content, schemas);
                let name = file.name.split(".json");

                this.setState(state => ({
                    list: state.list.concat(file),
                    schemas: schemas,
                    requests: requests,
                    responses: responses,
                    uris: uris,
                    name: name 
                }));

                console.log(this.state)
        }
        reader.readAsText(file);
        };
    }

    s2ab = (s) => {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }


    doExcel1 = () => {
        var blob, wb = {
            SheetNames:[], 
            Sheets:{}
        };
        var ws0 = XLSX
        .read(getTemplateCatalog(this.state.uris), {type:"binary"})
        .Sheets.Sheet1;

        wb.SheetNames.push("Catalogo Servicio"); 
        wb.Sheets["Catalogo Servicio"] = ws0;
        
        var ws1 = XLSX
        .read(getTemplateRequest(this.state.requests), {type:"binary"})
        .Sheets.Sheet1;

        wb.SheetNames.push("Request"); 
        wb.Sheets["Request"] = ws1;

        var ws2 = XLSX
        .read(getTemplateResponse(this.state.responses), {type:"binary"})
        .Sheets.Sheet1;

        wb.SheetNames.push("Responses"); 
        wb.Sheets["Responses"] = ws2;

        var ws3 = XLSX
        .read(getTemplateSchema(this.state.schemas), {type:"binary"})
        .Sheets.Sheet1;

        wb.SheetNames.push("Esquemas"); 
        wb.Sheets["Esquemas"] = ws3;

        blob = new Blob([this.s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], 
        {
            type: "application/octet-stream"
        });
        saveAs(blob, `${this.state.name}.xlsx`);
    }

    getRequest = (json, schemas = []) => {
        let list = [];
        let object = JSON.parse(json);
        let { paths } = object;

        Object.keys(paths).map((key, index) => {
            let props = paths[key];
            
            Object.keys(props).map((subKey, index) => {
                let subProps = props[subKey];
                let parameters = [];

                if(subProps.parameters){
                    Object.keys(subProps.parameters).map((parameter, index) => {
                        let subProp = subProps.parameters[parameter];
                        let { schema = null, type = null } = subProp;
                        let $ref = null;
                        let schemaFilter = null;

                        if(schema)
                        {

                            if(schema.$ref)
                            {
                                $ref = schema.$ref? schema.$ref.split("/").pop() : $ref;
                                type = schema.type? schema.type : "object"; 
                                
                            }
                            else if(schema.items){
              
                                $ref = schema.items.$ref? schema.items.$ref.split("/").pop() : $ref;
                                type = schema.type? schema.type : "object";
                            }

                            if($ref){
                                schemaFilter = schemas.find(s => s.name === $ref);
                            }
                            else
                            {
                                schemaFilter = schema.items.type;
                            }
                        }

                        parameters.push({
                            id: index,
                            ...subProp,
                            schema: schemaFilter,
                            type: type,
                            isObject: type === "object"? true : false
                        });

                    });

                    list.push({
                        id: index,
                        uri: key, 
                        requests: {
                            parameters: parameters
                        }
                    });

                    parameters = [];
                }
            });
        });

        return new Promise((resolve, reject) => {
            resolve(list)
        });;
    }

    getResponse = (json, schemas = []) => {
        let list = [];
        let object = JSON.parse(json);
        let { paths } = object;

        Object.keys(paths).map((key, index) => {
            let props = paths[key];
            Object.keys(props).map((subKey, index) => {
                let subProps = props[subKey];
                let responses = [];
                if(subProps.responses){

                    Object.keys(subProps.responses).map((response, index) => {
                        let subProp = subProps.responses[response];
                        let { schema = null, type = null } = subProp;
                        let $ref = null;
                        let schemaFilter = null;
                        if(response === "200")
                        {
                            if(schema)
                            {
                                if(schema.$ref)
                                {
                                    $ref = schema.$ref? schema.$ref.split("/").pop() : $ref;
                                    type = schema.type? schema.type : "object"
                                }
                                else if(schema.items){
                                    let { items } = schema;
                                    $ref = items.$ref? items.$ref.split("/").pop() : $ref;
                                    type = schema.type? schema.type : "object"
                                }
                 
                                if($ref){
                                    schemaFilter = schemas.find(s => s.name === $ref);
                                }
                                else
                                {
                                    schemaFilter = schema.items.type;
                                }
                            }
                            
                            responses.push({
                                id: index,
                                ...subProp,
                                schema: schemaFilter,
                                type: type,
                                isObject: type === "object"? true : false
                            });
                        }
                    }); 

                    list.push({
                        id: index,
                        uri: key, 
                        responses: responses
                    });

                    responses = [];
                }
            });
        });

        return new Promise((resolve, reject) => {
            resolve(list)
        });;
    }
    
    getSchemas = (json) => {
        let list = [];
        let propertiesList = [];
        let object = JSON.parse(json);
        
        Object.keys(object.definitions).map((key, index) => {
            let definitions = object.definitions[key];
            let { properties } = definitions;
            
            Object.keys(properties).map((subKey, index) => {
                let props = properties[subKey];
                let { items = null, type = null, format = null } = props;
                let $ref = null;

                if(items){              
                    $ref = items.$ref? items.$ref.split("/").pop() : $ref;
                    type = type? type : "object"
                }
                else if(props.$ref){
                    $ref = props.$ref.split("/").pop();
                    type = props.type? props.type : "object";
                }

                propertiesList.push({
                    id: index,
                    name: subKey,
                    type: type,
                    format: format,
                    schema: $ref
                });
            });

            let schema = {    
                name: key,
                properties: propertiesList
            }  

            list.push(schema);
            propertiesList = [];
        });

        return new Promise((resolve, reject) => {
            resolve(list)
        });;
    }

    getUris = (json) => {
        let list = [];
        let object = JSON.parse(json);
        let { paths } = object;

        Object.keys(paths).map((key, index) => {
            let props = paths[key];
            Object.keys(props).map((subKey, index) => {
                let subProp = props[subKey];
                let { tags = [], produces = [], consumes = []} = subProp;

                list.push({
                    uri: key,
                    method: subKey,
                    tags: tags, 
                    produces: produces, 
                    consumes:  consumes
                })
            });
           
        });
        console.log(list);
        return new Promise((resolve, reject) => {
            resolve(list)
        });;
    }

    render() {
        let { list } = this.state;
    
        return (
        <div className="App">
            <input type="file" name="images" id="imgid" className="imgcls" onChange={this.handleFile} multiple/>
            {
            list.map((file, index) => (
                <p key = {index}>
                    {file.name ? file.name : 'NOT SUPPORTED'}
                </p>
            ))
            }
            <button onClick={this.doExcel1}>Button</button>
        </div>
        );
    }
}

export default App;
