const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize

const conn = new Sequelize('postgress://localhost/acme_seq_db')

const Person = conn.define('person', {
    name: {
        allowNull: false,
        unique: true
    },
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    }
})
const Place = conn.define('place', {
    name: {
        allowNull: false,
        unique: true
    },
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    }
})
const Thing = conn.define('thing', {
    name: {
        allowNull: false,
        unique: true
    },
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    }
})

Person.belongsTo(Place)
Thing.belongsTo(Person)

const syncAndSeed = async()=>{
    await conn.sync({force: true});
    const places = [
        {name: 'RIO'},
        {name: 'NEVERLAND'},
        {name: 'PARIS'},
        {name: 'THE_CLOSEST_711'}
    ]
    const [RIO, NEVERLAND, PARIS, THE_CLOSEST_711] = await Promise.all(places.map(place => Place.create(place)));
    const people = [
        {name: 'RIO_1', placeId: RIO.id},
        {name: 'NEVERLAND_1', placeId: NEVERLAND.id},
        {name: 'PARIS_1', placeId: PARIS.id},
        {name: 'THE_CLOSEST_711_1', placeId: THE_CLOSEST_711.id}
    ]
    const [RIO_1, NEVERLAND_1, PARIS_1, THE_CLOSEST_711_1] = await Promise.all(people.map(person => Person.create(person)));
    const places = [
        {name: 'RIO_2', peopleId: NEVERLAND_1.id},
        {name: 'NEVERLAND_2', peopleId: NEVERLAND_1.id},
        {name: 'PARIS_2', peopleId: NEVERLAND_1.id},
        {name: 'THE_CLOSEST_711_2', peopleId: THE_CLOSEST_711_1.id}
    ]
    const [RIO, NEVERLAND, PARIS, THE_CLOSEST_711] = await Promise.all(places.map(place => (place)));
}

module.exports = {

}

syncAndSeed();