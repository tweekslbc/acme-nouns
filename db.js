const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize

const conn = new Sequelize('postgres://fzyiwkovbtfdsj:6407e97cf5351bd08640071266adb7c57dc29fc70340cd429fce5fcb44d0932a@ec2-107-22-160-185.compute-1.amazonaws.com:5432/d8koit0jcarg5o')

const Person = conn.define('person', {
    name: {
        type: STRING,
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
        type: STRING,
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
        type: STRING,
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
    const things = [
        {name: 'RIO_2', peopleId: RIO_1.id},
        {name: 'NEVERLAND_2', peopleId: NEVERLAND_1.id},
        {name: 'PARIS_2', peopleId: PARIS_1.id},
        {name: 'THE_CLOSEST_711_2', peopleId: THE_CLOSEST_711_1.id}
    ]
    await Promise.all(things.map(thing => Thing.create(thing)));
}

module.exports = {
    syncAndSeed,
    models: {
        Person,
        Place,
        Thing
    }
}

syncAndSeed();