import * as baseService from './base';

function all() {
    let results = (async () => {
        try {
            let data = await baseService.get('/api/blogs');
            data = await data.map((result) => {
                result.date = new Date(result['_created']);
                delete result['_created'];
                return result;
            });
            return data;

        } catch (error) {
            throw (error);
        }

    })();
    return results;
}

function one(id) {

    let result = (async () => {
        try {
            let data = await baseService.get(`/api/blogs/${id}`);
            data.date = new Date(await data['_created']);
            delete data["_created"];
            return data;
        } catch (error) {
            throw (error);
        }
    })();
    return result;
}

function insert(data) {
    return baseService.post('/api/blogs', data);
}

function update(id, data) {
    return baseService.put(`/api/blogs/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/blogs/${id}`);
}

export { all, one, insert, update, destroy };