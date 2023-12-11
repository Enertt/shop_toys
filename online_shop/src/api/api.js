import axios from "axios"

export const API = {
      
    getProductsW(params) {
        return axios.get(`http://localhost:3001/get_products_w?params=${params}`, 
        ).then(response => {
            return response.data
        })
    },
    getProductsC(category) {
        return axios.get(`http://localhost:3001/get_products_c?category=${JSON.stringify(category)}`, 
        ).then(response => {
            return response.data
        })
    },
    getProductsById(id) {
        return axios.get(`http://localhost:3001/get_products_by_id?id=${id}`
        ).then(response => {
            return response.data
        })
    },
    getNewProducts() {
        return axios.get(`http://localhost:3001/get_new_products`
        ).then(response => {
            return response.data
        })
    },
    uploadImg(newFile) {
        return axios.post(`http://localhost:3001/upload`, newFile, {
            headers: {
              'Content-Type': 'multipart/form-data', // Важно установить правильный заголовок для FormData
            },
          }).then(response => {
            return response.data
        })
    },
    uploadData(cost, title, categories, tags, descriptionState, token) {
        return axios.post(`http://localhost:3001/upload_data`, { cost, title, categories, tags, descriptionState, token }).then(response => {
            return response.data
        })
    },
    changeData(id, title, cost, tags, categories, date, descriptionState, isNew, token) {
        return axios.post(`http://localhost:3001/change_data`, { id, title, cost, tags, categories, date, descriptionState, isNew, token }).then(response => {
            return response.data
        })
    },
    deleteData(id, token) {
        return axios.post(`http://localhost:3001/delete_data`, { id, token }).then(response => {
            return response.data
        })
    },
    resetNew(token) {
        return axios.post(`http://localhost:3001/unset_new`, {token}).then(response => {
            return response.data
        })
    },
    login(password) {
        return axios.post(`http://localhost:3001/login`, { password }).then(response => {
            return response.data
        })
    },
}