
function findObjectIdfromResponse(resData: any, object_type: string) {
    let object_id = '';
    resData.effects.events.forEach( (e: any) => {
        if (e.newObject?.objectType === object_type) {
            object_id = e.newObject?.objectId;
        }
    });
    return object_id;
}

function findObjectIdFromAccountObjects(accountObjects: any, object_type: string) {
    let object_id = '';
    accountObjects.forEach( (o: any) => {
        if (o.type === object_type) {
            object_id = o.objectId;
        }
    });
    return object_id;
}


export { findObjectIdfromResponse, findObjectIdFromAccountObjects }