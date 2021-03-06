const url = 'http://localhost:4000/api/v1/themeparks'

class ThemeParksModel {
    static all = () => {
        return fetch(`${ url }/`).then(res => res.json())
    }
    static show = (id) => {
        return fetch(`${ url }/${ id }`).then(res => res.json())
    }
    static create = (themeParkData) => {
        return fetch(`${ url }/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(themeParkData)
        }).then(res => res.json())
    }
}

export default ThemeParksModel