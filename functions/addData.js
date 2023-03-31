const { createClient } = require("@astrajs/collections")

const collection = 'posts'

exports.handler = async function (event, context, callback) {
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        username: process.env.ASTRA_DB_KEYSPACE,
        password: process.env.ASTRA_DB_APPLICATION_TOKEN,
    })

    const posts = astraClient
        .namespace(process.env.ASTRA_DB_KEYSPACEą)
        .collection(collection)

    try {
        await posts.create("a post", {
            title: "first post",
        })
        return {
            statusCode: 200
        }
    } catch (e) {
        console.error(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}
