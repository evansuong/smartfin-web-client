const Widgets = {
    ride: {
        rideWidget1: buildWidget('RideWidget1', 'ride', {data: 'data'}),
        rideWidget2: buildWidget('RideWidget2', 'ride', {data: 'data'}),
        rideWidget3: buildWidget('RideWidget3', 'ride', {data: 'data'}),
    },
    multiple: {
        multipleWidget1: buildWidget('MultipleWidget1', 'multiple', {data: 'data'}),
        multipleWidget2: buildWidget('MultipleWidget2', 'multiple', {data: 'data'}),
        multipleWidget3: buildWidget('MultipleWidget3', 'multiple', {data: 'data'}),
    },
    CDIP: {
        CDIPWidget1: buildWidget('CDIPWidget1', 'CDIP', {data: 'data'}),
        CDIPWidget2: buildWidget('CDIPWidget2', 'CDIP', {data: 'data'}),
        CDIPWidget3: buildWidget('CDIPWidget3', 'CDIP', {data: 'data'}),
    }   
}

function buildWidget(title, type, data) {
    return {
        title: title,
        type: type,
        data: data,
    }
}

export default Widgets