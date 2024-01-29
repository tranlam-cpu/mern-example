import React from 'react'
import { DetailsView, FileManagerComponent, NavigationPane, Toolbar, Inject } from '@syncfusion/ej2-react-filemanager';

const FileManager=()=>{
	let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";


	return(
		<div className="control-section">
	        <FileManagerComponent id="file" view="LargeIcons" ajaxSettings={{
	        downloadUrl: hostUrl + 'api/FileManager/Download',
	        getImageUrl: hostUrl + "api/FileManager/GetImage",
	        uploadUrl: hostUrl + 'api/FileManager/Upload',
	        url: hostUrl + "api/FileManager/FileOperations"
	    }}>
	            <Inject services={[NavigationPane, DetailsView, Toolbar]}/>
	        </FileManagerComponent>
	    </div>
	)

}

export default FileManager