// Copyright (c) Web 3 Social Capital, Inc.
// SPDX-License-Identifier: Apache-2.0

/// The User module. Defines the User type and its functions.
module word_suip::user {
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID, ID};
    use sui::url::{Self, Url};
    use sui::transfer;
    use sui::event::emit;

    use std::vector;



    // ======== Types =========


    /// A user that joins WordSuip.
    struct User has key, store {
        id: UID,
        profile_pic: Url,
        likes: u64,
        followers: vector<ID>,
    }

    /// Belongs to the creator of the WordSuip. Has store, which
    /// allows building something on top of it (ie shared object with
    /// multi-access policy for managers).
    struct UserManagerCap has key, store { id: UID }

    /// Every User is registered here. 
    struct UserRegistry has key {
        id: UID,
        users: u64,
        user_ids: vector<ID>,
    }


    // ======== Events =========

    /// Event. When a new registry has been created.
    /// Marks the start of the game.
    struct RegistryCreated has copy, drop { id: ID }

    /// Event. When new User is created.
    struct UserCreated has copy, drop {
        id: ID,
        profile_pic: Url,
        created_date: u64,
        created_by: address
    }

    /// Event. Deleted user.
    
    struct UserDeleted has copy, drop {
        id: ID,
        deleted_date: u64,
        deleted_by: address
    }

        // ======== Functions =========

    /// Create a shared UserRegistry and give its creator the capability
    /// to manage the users if needed.
    fun init(ctx: &mut TxContext) {
        let id = object::new(ctx);

        emit(RegistryCreated { id: object::uid_to_inner(&id) });

        transfer::transfer(UserManagerCap { id: object::new(ctx) }, tx_context::sender(ctx));
        transfer::share_object(UserRegistry {
            id,
            user_ids: vector::empty(),
            users: 0,

        })
    }

    // ======= User facing functions =======

    /// Creates a new user. Can be called only once per address.
    /// Emits `UserCreated` event.
    
    public entry fun create_user(
        reg: &mut UserRegistry,
        ctx: &mut TxContext,
    ) {

        let id = object::new(ctx);
        let sender = tx_context::sender(ctx);
        let dummy_url = vector::empty();
        let profile_pic = url::new_unsafe_from_bytes(dummy_url);

        emit(UserCreated {
            id: object::uid_to_inner(&id),
            profile_pic: profile_pic,
            created_date: tx_context::epoch(ctx),
            created_by: sender,
        });

        let user = User {
            id: id,
            profile_pic: profile_pic,
            likes: 0,
            followers: vector::empty<ID>(),
        };
        
        reg.users = reg.users + 1;

        vector::push_back(&mut reg.user_ids, object::uid_to_inner(&user.id));

        transfer::transfer(user, sender);


    }

    /// Deletes a user. Can be called only once per address.
    /// Emits `UserDeleted` event.
    
    public entry fun delete_user(
        user: User,
        ctx: &mut TxContext,
    ) {

        
        let sender = tx_context::sender(ctx);

        let User { id, profile_pic, likes, followers } = user;

        emit(UserDeleted {
            id: object::uid_to_inner(&id),
            deleted_date: tx_context::epoch(ctx),
            deleted_by: sender,
        });

        object::delete(id);
    }


        // ======= View functions =======

    /// Returns the number of users in the registry.    
    
    public fun get_users_count(reg: &UserRegistry): u64 {
        reg.users
    }



        // ======== Test =========

    #[test_only]
    public fun test_module_init(ctx: &mut TxContext) {
        use sui::test_scenario;
        use std::debug;

        let id = object::new(ctx);

        emit(RegistryCreated { id: object::uid_to_inner(&id) });
        
        transfer::transfer(UserManagerCap { id: object::new(ctx) }, tx_context::sender(ctx));
        transfer::share_object(UserRegistry {
            id,
            user_ids: vector::empty(),
            users: 0,

        });



        // create test address representing game admin
        let admin = @0xBABE;
        debug::print(&admin);

        // first transaction to emulate module initialization
        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        // second transaction to check if the UserRegistry has been created
        // and has initial value of zero users created
        test_scenario::next_tx(scenario, admin);
        {
            // extract the UserRegistry object
            let reg = test_scenario::take_from_sender<UserRegistry>(scenario);
            // verify number of created swords
            assert!(get_users_count(&reg) == 0, 1);
            // return the Forge object to the object pool
            test_scenario::return_to_sender(scenario, reg);
        };
        test_scenario::end(scenario_val);

        
    }


    #[test_only]
    public fun test_create_user(ctx: &mut TxContext) {
        use sui::test_scenario;
        use std::debug;

        let id = object::new(ctx);

        emit(RegistryCreated { id: object::uid_to_inner(&id) });
        
        transfer::transfer(UserManagerCap { id: object::new(ctx) }, tx_context::sender(ctx));
        transfer::share_object(UserRegistry {
            id,
            user_ids: vector::empty(),
            users: 0,

        });

        // create test address representing game admin
        let admin = @0xBABE;
        debug::print(&admin);

        // first transaction to emulate module initialization
        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        // second transaction to check if the UserRegistry has been created
        // and has initial value of zero users created
        test_scenario::next_tx(scenario, admin);
        {
            // extract the UserRegistry object
            let reg = test_scenario::take_from_sender<UserRegistry>(scenario);
            let cap = test_scenario::take_from_sender<UserManagerCap>(scenario);

            // create a new user
            create_user(&cap, &mut reg, ctx);
            test_scenario::return_to_sender(scenario, cap);
            test_scenario::return_to_sender(scenario, reg);
        };
        test_scenario::end(scenario_val);
    }


    #[test_only]
    public fun test_delete_user(ctx: &mut TxContext) {
        use sui::test_scenario;
        use std::debug;

        let id = object::new(ctx);

        emit(RegistryCreated { id: object::uid_to_inner(&id) });
        
        transfer::transfer(UserManagerCap { id: object::new(ctx) }, tx_context::sender(ctx));
        transfer::share_object(UserRegistry {
            id,
            user_ids: vector::empty(),
            users: 0,

        });

        // create test address representing game admin
        let admin = @0xBABE;
        debug::print(&admin);

        // first transaction to emulate module initialization
        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        // second transaction to check if the UserRegistry has been created
        // and has initial value of zero users created
        test_scenario::next_tx(scenario, admin);
        {
            // extract the UserRegistry object
            let reg = test_scenario::take_from_sender<UserRegistry>(scenario);
            let cap = test_scenario::take_from_sender<UserManagerCap>(scenario);

            // create a new user
            create_user(&cap, &mut reg, ctx);
            assert!(get_users_count(&reg) == 1, 1);
            test_scenario::return_to_sender(scenario, reg);
            test_scenario::return_to_sender(scenario, cap);
        };

        test_scenario::next_tx(scenario, admin);
        {
            let reg = test_scenario::take_from_sender<UserRegistry>(scenario);
            let user = test_scenario::take_from_sender<User>(scenario);
            delete_user( user, ctx);
            assert!(get_users_count(&reg) == 0, 1);
            test_scenario::return_to_sender(scenario, reg);
        };

        test_scenario::end(scenario_val);
    }

}