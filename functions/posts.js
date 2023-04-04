const { createClient } = require("@astrajs/collections")

const collection = 'tktposts'

exports.handler = async function (event, context, callback) {
    console.log(process.env)
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN
    })

    const posts = astraClient
        .namespace(process.env.ASTRA_DB_KEYSPACE)
        .collection(collection)


    try {
        const res = await posts.find()
        return {
            statusCode: 200,
            body: JSON.stringify(Object.values(res.data)),
        }
    } catch (e) {
        console.error(e)

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}
