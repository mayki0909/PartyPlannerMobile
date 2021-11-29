

const api = 'http://api.partyplanner.si/api';

const headers = {
    'Content-Type': 'application/json',
}

///PARTY
export const getAllParties = async () =>{

    let response = await fetch(`${api}/party`,{
        method: 'GET',
        mode: 'no-cors',
        // headers: headers
    });

    console.log(response)

    if (response.status === 200) {
        let data = await response.json();
        return data;
    }

    return undefined;
} 

export const getPartyById = async (id: string) =>{

    let response = await fetch(`${api}/party/${id}`,{
        method: 'GET',
        headers: headers
    });
    let data = await response.json();
    return data;
}

export const putParty = async (name: string) =>{
    let response = await fetch(`${api}/party?name=${name}`,{
        method: 'PUT',
        headers: headers,
    });
    let data = await response.json();
    return data;
}

