import { useState } from "react";
import { useWallet, useSuiProvider } from '@suiet/wallet-kit';

const network = process.env.REACT_APP_SUI_LOCAL_ENDPOINT || 'local';
const contractAddress = process.env.REACT_APP_SUI_LOCAL_NETWORK_WORDSUIP_PACKAGE_ADDRESS || '';
const userRegistryAddress = process.env.REACT_APP_SUI_LOCAL_NETWORK_WORDSUIP_USER_REGISTRY_ADDRESS || '';
const userManagerCap = process.env.REACT_APP_SUI_LOCAL_NETWORK_WORDSUIP_USER_MANAGER_CAP_ADDRESS || '';
const userType = contractAddress + '::user::User';


const useSui = () => { 
    const wallet = useWallet();
    const provider = useSuiProvider(network);
    const [userObject, setUserObject] = useState<any>(null);

    const isUser = async () => {
        let isUser = await provider.getObject(userObject)
        return (isUser.status === 'Exists') ? true : false;
    }

    const createUser = async () => { //TODO: add profile_picture: string

        if (!wallet.connected) return
        try {
          const resData = await wallet.signAndExecuteTransaction({
            transaction: {
              kind: 'moveCall',
              data: {
                packageObjectId: contractAddress,
                module: 'user',
                function: 'create_user',
                typeArguments: [],
                arguments: [
                  userManagerCap,
                  userRegistryAddress,
                ],
                gasBudget: 10000,
              }
            }
          });
          let object_id = find_object_id(resData, userType);
          setUserObject(object_id);
          console.log('user added successfully!', resData);
          alert('welcome to word suip!')
        } catch (e) {
          console.error('user failed', e);
        }

    };

    return {
        isUser,
        createUser,
    }
}

function find_object_id(resData: any, object_type: string) {
    let object_id = '';
    resData.effects.events.forEach( (e: any) => {
        if (e.newObject?.objectType === object_type) {
            object_id = e.newObject?.objectId;
        }
    });
    return object_id;
}

export default useSui;