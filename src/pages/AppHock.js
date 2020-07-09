import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './App.css';

function MyDropzone() {
    const [fileListState, setFileListstate] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                setFileListstate(state => state.concat(acceptedFiles));
        }
        
        reader.readAsText(file);
    });
        
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    
    console.log(fileListState)
    return (
       <div>
            <div {...getRootProps()} className="App">
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div>
                <ul>
                    {
                        fileListState.map((file, index) => (
                            <li key={index}>
                                <p>
                                    Filename: {file.name ? file.name : 'NOT SUPPORTED'}
                                </p>
                                <p>
                                    Type: {file.type ? file.type : 'NOT SUPPORTED'}
                                </p>
                                <p>
                                    Size: {file.size ? file.size : 'NOT SUPPORTED'}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>
       </div>
  )
}

export default MyDropzone;