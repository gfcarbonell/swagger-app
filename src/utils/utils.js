const getDataType = (item) => {
    let dataType = "";

    switch(item.type){
        case "integer": dataType = "int"; break;
        case "boolean": dataType = "bool"; break;
        case "number": dataType = "double"; break;
        case "array": dataType = "List"; break;
        case "string": 
                        if(item.format === "date-time"){
                            dataType = "DateTime";
                        }
                        break;
        
        default: dataType = item.type;
    }

    return dataType;
}

export default getDataType;