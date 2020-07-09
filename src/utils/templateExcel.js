const getTemplateSchema = (data = []) => {
    
    let schemaName = "";
    let tbody = `
        <!DOCTYPE html> <html lang="en"> 
            <head>
                <meta charset="utf-8" />
            </head>

            <body>
            <tbody>
    `;

    let thead = `
        <thead>
            <tr>
                <th>Schema</th>
                <th>Level</th>
                <th>DataType</th>
                <th>Format</th>
                <th>Definition</th>
            </tr>
        </thead>
    `;

    data.map((item, index) => {
        if(schemaName !== item.name)
        {
            let { name } = item;
            schemaName = name;

            tbody += `
                <tr>
                    <td>${schemaName? schemaName: ""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        }

        item.properties.map((property, index) => {
            tbody += `
                <tr>
                    <td></td>
                    <td>${property.name? property.name: ""}</td>
                    <td>${property.type? property.type: ""}</td>
                    <td>${property.format? property.format: ""}</td>
                    <td>${property.schema? property.schema: ""}</td>
                </tr>
            `;
        });

        return null;
    });

    tbody += "</tbody> <body> </html>";
    
    let template = `
        <table>
            ${thead}
            ${tbody}
        </table>
    `;

    return template;
}

const getTemplateResponse = (data = []) => {
    let uri = "";
    let tbody = `
    <!DOCTYPE html> <html lang="en"> 
        <head>
            <meta charset="utf-8" />
        </head>
        <body>
            <tbody>
        `;

    let thead = `
        <thead>
            <tr>
                <th>Interface Name</th>
                <th>Schema</th>
                <th>Level</th>
                <th>DataType</th>
                <th>Format</th>
                <th>Definition</th>
            </tr>
        </thead>
    `;

    data.map((item, index) => {
        let { responses} = item;

        if(uri !== item.uri)
        {
            uri = item.uri;
            tbody += `
                <tr>
                    <td>${uri? uri: ""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        }

        responses.map((response, index) => {
            let { schema, isObject } = response;

            if(isObject)
            {
                tbody += `
                        <tr>
                            <td></td>
                            <td>${schema.name? schema.name: ""}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    `;
                

                schema.properties.map((property, index) => {
                    tbody += `
                        <tr>
                            <td></td>
                            <td></td>
                            <td>${property.name? property.name: ""}</td>
                            <td>${property.type? property.type: ""}</td>
                            <td>${property.format? property.format: ""}</td>
                            <td>${property.schema? property.schema: ""}</td>
                        </tr>
                    `;
                });
            }
            else
            {
                tbody += `
                    <tr">
                        <td></td>
                        <td></td>
                        <td>${response.name? response.name: ""}</td>
                        <td>${response.type? response.type: ""}</td>
                        <td>${response.format? response.format: ""}</td>  
                        <td>${response.schema? response.schema: ""}</td>
                    </tr>
                `;
            }
        });
    });


    tbody += "</tbody> <body> </html>";
    
    let template = `
        <table>
            ${thead}
            ${tbody}
        </table>
    `;

    return template;
}

const getTemplateRequest = (data = []) => {
    let uri = "";
    let tbody = `
    <!DOCTYPE html> <html lang="en"> 
        <head>
            <meta charset="utf-8" />
        </head>
        <body>
            <tbody>
        `;

    let thead = `
        <thead>
            <tr>
                <th>Interface Name</th>
                <th>Schema</th>
                <th>Level</th>
                <th>DataType</th>
                <th>Format</th>
                <th>Definition</th>
                <th>In</th>
            </tr>
        </thead>
    `;

    data.map((item, index) => {
        let { parameters} = item.requests;

        if(uri !== item.uri)
        {
            uri = item.uri;
            tbody += `
                <tr>
                    <td>${uri? uri: ""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        }

        parameters.map((parameter, index) => {
            let { schema, isObject } = parameter;

            if(isObject)
            {
                tbody += `
                    <tr>
                        <td></td>
                        <td>${schema.name? schema.name: ""}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>${parameter.in? parameter.in: ""}</td>
                    </tr>
                `;
    
                schema.properties.map((property, index) => {
                   
                    tbody += `
                        <tr>
                            <td></td>
                            <td></td>
                            <td>${property.name? property.name: ""}</td>
                            <td>${property.type? property.type: ""}</td>
                            <td>${property.format? property.format: ""}</td>
                            <td>${property.schema? property.schema: ""}</td>
                            <td></td>
                        </tr>
                    `;
                });
            }
            else{  
                tbody += `
                    <tr">
                        <td></td>
                        <td></td>
                        <td>${parameter.name? parameter.name: ""}</td>
                        <td>${parameter.type? parameter.type: ""}</td>
                        <td>${parameter.format? parameter.format: ""}</td>  
                        <td>${parameter.schema? parameter.schema: ""}</td>
                        <td>${parameter.in? parameter.in: ""}</td>
                    </tr>
                `;
            }
        });
    });

    tbody += "</tbody> <body> </html>";
    
    let template = `
        <table>
            ${thead}
            ${tbody}
        </table>
    `;

    return template;
}

const getTemplateCatalog = (data = []) => {
    let tbody = `
    <!DOCTYPE html> <html lang="en"> 
        <head>
            <meta charset="utf-8" />
        </head>
        <body>
            <tbody>
        `;
        								
    let thead = `
        <thead>
            <tr>
                <th>ID Name</th>
                <th>Servicio</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Fuente</th>
                <th>Propietario</th>
                <th>Es Consumido</th>
                <th>Ruta Servicio</th>
                <th>Ruta Servicio</th>
                <th>Tipo Servicio</th>
                <th>Operacion</th>
                <th>Disponibilidad </th>
                <th>SLA (ms)</th>
                <th>Link</th>
            </tr>
        </thead>
    `;

    data.map((item, index) => {
        tbody += `
            <tr>
                <td>ISA_SVC_${index}</td>
                <td></td>
                <td></td>
                <td>Propia</td>
                <td>Informatica</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${item.uri? item.uri: ""}</td>
                <td>REST</td>
                <td>${item.method? item.method.toUpperCase(): ""}</td>
                <td>HIGH</td>
                <td></td>
                <td></td>
            </tr>
        `;
    });

    tbody += "</tbody> <body> </html>";
    
    let template = `
        <table>
            ${thead}
            ${tbody}
        </table>
    `;

    return template;
}

export { getTemplateSchema, getTemplateResponse, getTemplateRequest, getTemplateCatalog}