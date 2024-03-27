import {test} from "tap";
import {fastify} from "fastify";
import DBPlugin from "../../../src/plugins/db";

test('register DBPlugin', async t => {
    const app = fastify()
    app
        .register(DBPlugin)
        .after(err => {
            if (err) {
                t.fail();
            }
        })

    t.teardown(app.close.bind(app))
})

test('error register DBPlugin', async t => {
    const app = fastify()
    const fakeDBPlugin = async () => {
        throw(new Error('test error'))
    }
    app
        .register(fakeDBPlugin)
        .after(err => {
            if (!err) {
                t.fail();
            }
        })

    t.teardown(app.close.bind(app))
})
