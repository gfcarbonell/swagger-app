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
    let name = "";
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
        item.responses.map((response, index) => {
            if(uri !== response.uri)
            {
                uri = response.uri;
                tbody += `
                    <tr>
                        <td>${response.uri? response.uri: ""}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
            }

            if(index === 0)
            {
                name = response.name; 
                tbody += `
                    <tr>
                        <td></td>
                        <td>${name? name: ""}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `
            }

            tbody += `
                <tr>
                    <td></td>
                    <td></td>
                    <td>${response.property? response.property: ""}</td>
                    <td>${response.type? response.type: ""}</td>
                    <td>${response.format? response.format: ""}</td>
                    <td>${response.schema? response.schema: ""}</td>
                </tr>
            `;
        });

        uri = "";

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
                </tr>
            `;
        }
        console.log(data)
        parameters.map((parameter, index) => {
            tbody += `
                <tr">
                    <td></td>
                    <td>${parameter.schema? parameter.schema: ""}</td>
                    <td>${parameter.schema? "": parameter.name}</td>
                    <td>${parameter.type}</td>                     
                    <td></td>
                    <td>${parameter.in}</td>
                </tr>
            `;
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

export { getTemplateSchema, getTemplateResponse, getTemplateRequest}