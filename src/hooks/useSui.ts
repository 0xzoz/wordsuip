import { useEffect, useState } from "react";
import { useWallet, useSuiProvider } from '@suiet/wallet-kit';
import { findObjectIdFromAccountObjects, findObjectIdfromResponse } from "../utils/sui";
const network = process.env.REACT_APP_SUI_LOCAL_ENDPOINT || 'local';
const contractAddress = process.env.REACT_APP_SUI_LOCAL_NETWORK_WORDSUIP_PACKAGE_ADDRESS || '';
const userRegistryAddress = process.env.REACT_APP_SUI_LOCAL_NETWORK_WORDSUIP_USER_REGISTRY_ADDRESS || '';
const userType = contractAddress + '::user::User';


const useSui = () => { 
    const wallet = useWallet();
    const address = wallet.account?.address || '';
    const provider = useSuiProvider(network);
    const [userObject, setUserObject] = useState<any>('');

    useEffect(() => {
      if(address !== ''){
        const getUser = async () => {
        await queryUserObject(address);
        }
        getUser();
      } 
    }, [address, queryUserObject]);


    const isUser = async () => {
        if(address === '') return false;
        await queryUserObject(address);
        if(userObject === '') return false;
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
                  userRegistryAddress,
                ],
                gasBudget: 10000,
              }
            }
          });
          let object_id = findObjectIdfromResponse(resData, userType);
          setUserObject(object_id);
          console.log('user added successfully!', resData);
          alert('welcome to word suip!')
        } catch (e) {
          console.error('user failed', e);
        }

    };

    const deleteUser = async () => {
      await queryUserObject(address);
      if (!wallet.connected) return
        try {
          const resData = await wallet.signAndExecuteTransaction({
            transaction: {
              kind: 'moveCall',
              data: {
                packageObjectId: contractAddress,
                module: 'user',
                function: 'delete_user',
                typeArguments: [],
                arguments: [
                  userObject,
                ],
                gasBudget: 10000,
              }
            }
          });
          setUserObject('');
          alert('Goodbye. We will miss you!')
        } catch (e) {
          console.error('Unable to delete user', e);
        }    
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function queryUserObject(address: string){
        const accountObjects = await provider.getObjectsOwnedByAddress(address);
        let object_id = await findObjectIdFromAccountObjects(accountObjects, userType);
        await setUserObject(object_id);
    }

    return {
        isUser,
        createUser,
        deleteUser
    }
}

export default useSui;