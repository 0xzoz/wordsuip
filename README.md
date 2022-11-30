# wordsuip

Decentralized publisher on SUI using Ceramic

Intended to be a tutorial on how to build with SUI and Ceramic

Landing page look: logo and underneath simple sui(sui colors) x ceramic(ceramic colors)
![](https://i.imgur.com/92OcLuD.png)

**Color Pallete**
https://www.schemecolor.com/homer-the-simpsons-cartoon-colors.php

**Front Page Look:** neutral grey, black text(think simpsons style newspaper) 
![](https://i.imgur.com/nLQXX55.png)


References:
- [headline](https://viaheadline.xyz/)
- [Paragraph](https://paragraph.xyz/)
- [Mirror](https://mirror.xyz/dashboard)


## Tech Stack
- React
- Sui
- Ceramic
- Outline - Rich Markdown Editor
- Lit protocol encrypt


## Ceramic Notes
[Working with images](https://developers.ceramic.network/reference/self-id/modules/image_utils/)


## Sui Notes
[Wallet Library](https://kit.suiet.app/docs/QuickStart)
[Sui Move cheatsheet docs](https://examples.sui.io/)
[Sui Dev Env Setup Cheatsheet](https://hackmd.io/QPHqN6oEShyujS4P2xBfzg?both)
## User Story
- A user needs to be able to connect to SUI wallet
- A user needs to be able to be identified by that wallet
- A user need to be able to create a post
- A user needs to be able view previous posts when logged in.

## Technical path
**userflow:** login(sui wallet) > create post(Rich Markdown Editor:set as ceramic data model post) > Encrypt(Lit) > wrapper add to sui(sui)  

**front page:** show in order, pull from from sui object, if a user clicks unencrypt give them voting options, cant click out, have to either like or not like. 

## Data Model 
- Post
    - title
    - image
    - description
    - body
    - tags[] 
    - likes[] cumalative array -1 +1

- Sui side
    - Wrapper of encrypted post and sui[currency]
    - Mechnism - likes has a certain cost(small) downvotes have an even smaller cost but deduct from the likes quadratically(prob really flawed - vitalik has surely though deep about this). Protocol only gets money on downvotes. Fees go to either ReFi(spirals) or 0L or combination of the two.
    
- Algorithm 


## V2
- front page(newspaper like) 
- chosen algorithms

## V3
- design own algorithms


### weird alternate world

anon culture and a matt greorging pft set that is determined using AI of the persons picture of choice and a simpsons style picture.

