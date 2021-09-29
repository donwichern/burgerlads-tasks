import API from '@aws-amplify/api';
import { Button } from '@mui/material';
import React from 'react'

import {createTaskItem as createTaskItemMutation} from '../graphql/mutations'; 
import {createTaskList as createTaskListMutation} from '../graphql/mutations';
import {createTaskSection as createTaskSectionMutation} from '../graphql/mutations';


const UploadListFromFile = () => {    

    // Create the list part
    async function runCreateMutation(mutation, info) {
        let q = {
            query: mutation,
            variables: {input: info}
        };

        let rval = await API.graphql(q);

        console.log(rval);

        return (rval.data);

    }    

    async function uploadNewListFile(e) {
        const fileToUpload = e.target.files[0];
        console.log(fileToUpload.name);

        let reader = new FileReader();
        reader.onload = function(e) {
            let data = e.target.result;
            parseNewListFile(data);
        }

        reader.readAsText(fileToUpload);
    }
    
    async function parseNewListFile(data) {

        console.log("here");
        console.log(data);

        let parseData = [];

        const PART_TYPE_I = 0;
        const DISPLAY_ORDER_I = 1;
        const NAME_I = 2;
        const DESCRIPTION_I = 3;
        const DATA_TYPE_I = 4;

        let listId = "";
        let sectionId = "";

        let lines = data.split("\n");
        console.log(lines);
        for (let i=1; i<lines.length; i++) {
            let t = lines[i].split("\t");
            t = t.map(s => s.trim());

            let parttype = t[PART_TYPE_I];
            let displayorder = t[DISPLAY_ORDER_I];
            let name = t[NAME_I];
            let desc = t[DESCRIPTION_I];
            let datatype = t[DATA_TYPE_I];

            if (parttype === "List") {
                let info = {title: name, description: desc};
                let tmp = await runCreateMutation(createTaskListMutation, info); 
                listId = tmp.createTaskList.id;
            }
            else if (parttype === "Section") {
                let info = {
                    title: name, 
                    description: desc, 
                    displayOrder: displayorder,
                    taskListID: listId
                };                
                let tmp = await runCreateMutation(createTaskSectionMutation, info);                
                sectionId = tmp.createTaskSection.id;
            }
            else if (parttype === "Task") {
                let info = {
                    name: name,
                    description: desc,
                    displayOrder: displayorder,
                    resultType: datatype,
                    taskSectionID: sectionId
                }
                let tmp = await runCreateMutation(createTaskItemMutation, info);
                let taskId = tmp.createTaskItem.id;
            }
            

            parseData.push(t);
        } // for i...

        // create the list out of the parsed data

        // debug data
        console.table(parseData);
        
    }

    return (
        <div>
            <Button
                variant="contained"
                component="label"
            >
                Upload New List (.txt)
                <input
                    type="file"
                    name="upload-list-file"
                    onChange={e => {uploadNewListFile(e)}}
                    //placeHolder="New List.txt"
                    hidden
                />
            </Button>
        </div>
    )
}

export default UploadListFromFile;
