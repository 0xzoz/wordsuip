// Copyright (c) Web 3 Social Capital, Inc.
// SPDX-License-Identifier: Apache-2.0

/// The User module. Defines the User type and its functions.
module word_suip::user {
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID, ID};
    use sui::url::Url;
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
    
    public fun create_user(
        _: &UserManagerCap, 
        reg: &mut UserRegistry,
        ctx: &mut TxContext,
        profile_pic: Url,
    ) {

        let id = object::new(ctx);
        let sender = tx_context::sender(ctx);

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
    
    public fun delete_user(
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

}