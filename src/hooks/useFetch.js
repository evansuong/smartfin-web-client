

function apiQuery(queryString) {
    let rideData = {hi: "hi'"};
    () => fetch(queryString)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        rideData = data;
    });
    return rideData;
}

export default apiQuery;