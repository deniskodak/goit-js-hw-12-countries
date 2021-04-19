export default function createInfo(data, callback) {
    return data.map(country => callback(country)).join('');
}