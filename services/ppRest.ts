import {Info,Guest,Category} from '../models';

const api = 'http://mobile-api.partyplanner.si/api';

const headers = {
    'Content-Type': 'application/json',
}

///PARTY
export const getAllParties = async () =>{

    let response = await fetch(`${api}/party`,{
        method: 'GET',
        headers: headers
    });

    if (response.status === 200) {
        let data = await response.json();
        return data;
    }

    return undefined;
} 

export const getPartyById = async (id: string) => {

    let response = await fetch(`${api}/party/${id}`,{
        method: 'GET',
        headers: headers
    });
    let data = await response.json();
    return data;
}

export const putParty = async (name: string) => {
    
    let response = await fetch(`${api}/party?name=${name}`,{
        method: 'PUT',
        headers: headers,
    });
    let data = await response.json();
    return data;
}

///PARTY DETALS

export const getPartyDetails = async (partyId: String) => {
    
    let response = await fetch(`${api}/PartyInfo/${partyId}`,{
        method: 'GET',
        headers: headers
    });
    let data = await response.json();
    return data;
}

export const postPartyDetails = async (partyId:String,partyInfo: Info) => {
    
    let response = await fetch(`${api}/PartyInfo/${partyId}`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(partyInfo)
    });
    return response;
}

//GUESTS
export const getGuestList = async (partyId: String) => {

    let response = await fetch(`${api}/Guest/${partyId}`,{
        method: 'GET',
        headers: headers,
    });
    let data = await response.json();
    return data;
}

export const putGuest = async (partyId:String, guest: Guest) => {

    let response = await fetch(`${api}/Guest/${partyId}`,{
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(guest),
    });
    let data = await response.json();
    return data;
}

export const postGuestList = async (partyId:String, guestList: Guest[]) => {
 
    let response = await fetch(`${api}/Guest/${partyId}`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(guestList),
    });
    let data = await response.json();
    return data;
}

export const deleteGuest = async (partyId:String, guestId:Number) =>{

    let response = await fetch(`${api}/Guest/${partyId}/${guestId}`,{
        method: 'DELETE',
        headers: headers,
    });

    return response;
}

///CATEGORY

export const putCategory = async (partyId: String,category:Category) => {

    let response = await fetch(`${api}/Category/${partyId}`,{
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(category)
    });
    let data = await response.json();
    return data;
}

export const postCategory = async (partyId: String,category:Category) => {
   
    let response = await fetch(`${api}/Category/${partyId}`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(category)
    });
    let data = await response.json();
    return data;
}

export const getCategoryList = async (partyId: String) => {

    let response = await fetch(`${api}/Category/${partyId}`,{
        method: 'GET',
        headers: headers
    });
    let data = await response.json();
    return data;
}

export const deleteCategory = async (partyId:String,categoryId:Number) => {

    let response = await fetch(`${api}/Category/${partyId}/${categoryId}`,{
        method: 'DELETE',
        headers: headers,
    });

    return response;
}

export const getCategoryById = async (partyId:String,categoryId:Number) => {

    let response = await fetch(`${api}/Category/${partyId}/${categoryId}`,{
        method: 'GET',
        headers: headers
    });
    let data = await response.json();
    return data;
}
