export const sectionTransform = (item) => ({
    id: item.id,
    typeName: item.section_type.name,
    orderNum: item.order_num,
    header: item.header,
    body: item.body,
    isFeedShow: item.is_feed_show,

    sectionMarker: item.marker ? {
        id: item.marker.id,
        name: item.marker.name,
        description: item.marker.description,

        markerImage: {
            filename: item.marker.image_filename,
            description: item.marker.image_description
        },

        coordinate: {
            name: item.marker.coordinate_name,
            latitude: item.marker.coordinate_latitude,
            longitude: item.marker.coordinate_longitude 
        },

        boundary: {
            latitudeTopLeft: item.marker.boundary_latitude_top_left,
            longitudeTopLeft: item.marker.boundary_longitude_top_left,
            latitudeBottomRight: item.marker.boundary_latitude_bottom_right,
            longitudeBottomRight: item.marker.boundary_longitude_bottom_right
        },
    } : null,

    sectionImage: item.section_image ? {
        id: item.section_image.id,
        filename: item.section_image.filename,
        description: item.section_image.description,
    } : null,

    sectionQuote: item.quote ? {
        id: item.quote.id,
        body: item.quote.body,
        personName: item.quote.person_name,
        profession: item.quote.profession,
        avatarFilename: item.quote.avatar_filename,
    }: null,
})
