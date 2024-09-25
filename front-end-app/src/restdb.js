const baseURL = 'http://localhost:4000/customers';

export async function getAll(page, setCustomers, searchText) {
    const myInit = {
        method: 'GET',
        mode: 'cors'
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            alert(error);
        }
    };

    const limit = 15;
    const offset = (page - 1) * limit;

    const searchParam = searchText ? `&q=${encodeURIComponent(searchText)}` : '';
    const url = `${baseURL}?_limit=${limit}&_start=${offset}${searchParam}`;

    fetchData(url);
}

export async function getCount(setCount) {
    const myInit = {
        method: 'GET',
        mode: 'cors'
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setCount(data.length);
        } catch (error) {
            alert(error);
        }
    };

    const url = baseURL;

    fetchData(url);
}


export async function deleteById(id, postopCallback) {
    const myInit = {
        method: 'DELETE',
        mode: 'cors'
    };
    const deleteItem = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.status}`);
            }
            await response.json();
            postopCallback();
        } catch (error) {
            alert(error);
        }
    }
    deleteItem(baseURL + "/" + id);
}

export function post(customer, postopCallback) {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    delete customer.id;
    const myInit = {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: myHeaders,
        mode: 'cors'
    };
    const postItem = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error posting data: ${response.status}`);
            }
            await response.json();
            postopCallback();
        } catch (error) {
            alert(error);
        }
    }
    postItem(baseURL);
}

export function put(customer, postopCallback) {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    const myInit = {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: myHeaders,
        mode: 'cors'
    };
    const putItem = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error puting data: ${response.status}`);
            }
            await response.json();
            postopCallback();
        } catch (error) {
            alert(error);
        }
    }
    putItem(baseURL + "/" + customer.id);
}
