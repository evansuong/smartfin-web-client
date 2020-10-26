
function widgetTemplate(title, body, gridItem) {
    return {
        titleText: title,
        bodyComponent: body,
        gridItem: gridItem
    }
}

// list of all widgets in their corresponding views
const Widgets = {
    ride: {
        rideWidget1: widgetTemplate('RideWidget1', 'ride graphs', 'main'),
        rideWidget2: widgetTemplate('RideWidget2', 'height info', 'side'),
        rideWidget3: widgetTemplate('RideWidget3', 'swell period graph', 'left-square'),
        rideWidget4: widgetTemplate('RideWidget4', 'ride map', 'right-square'),
    },
    multiple: {
        multipleWidget1: widgetTemplate('MultipleWidget1', 'temp graphs', 'main'),
        multipleWidget2: widgetTemplate('MultipleWidget2', 'temp info', 'side'),
        multipleWidget3: widgetTemplate('MultipleWidget3', 'swell temperature graph', 'left-square'),
        multipleWidget4: widgetTemplate('MultipleWidget4', 'ride-map', 'right-square'),
    },
    CDIP: {
        CDIPWidget1: widgetTemplate('CDIPWidget1', 'CDIP', 'main'),
        CDIPWidget2: widgetTemplate('CDIPWidget2', 'CDIP', 'side'),
        CDIPWidget3: widgetTemplate('CDIPWidget3', 'CDIP', 'left-square'),
        CDIPWidget4: widgetTemplate('CDIPWidget4', 'CDIP', 'right-square'),
    }   
}

export default Widgets