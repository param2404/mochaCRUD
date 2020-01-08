const Student = require('../app/student');
const assert = require('assert');


///////CREATE/////////
describe('Create Tests', () => {
    it('create an user in DB', () => {
        //assert(true);
        const Sameul = new Student({ name: "Sameul" })
        Sameul.save()
            .then(() => {
                assert(!Sameul.isNew)
            })
            .catch(() => {
                console.log('Error');
            })
    });
});

//////////READ///////////
describe('Read Tests', () => {
    let reader;
    beforeEach((done) => {
        reader = new Student({ name: "Reader" })
        reader.save()
            .then(() => {
                done();
            })
    })
    it("Read a user:Reader", () => {
        Student.find({ name: "Reader" })
            .then((students) => {
                assert(reader._id.toString() === students[0]._id.toString());
                done();
            })
    })
})

///////DELETE TEST////////
describe("Delete Test", () => {
    let deleter;
    beforeEach(done => {
        deleter = new Student({ name: "Deleter" });
        deleter.save().then(() => done());
    });
    it("Delete a user", done => {
        //Student.findByIdAndDelete(deleter._id)
        Student.findByIdAndRemove(deleter._id)
            .then(() => Student.findOne({ name: "Deleter" }))
            .then(students => {
                assert(students === null);
                done();
            });
    });
});
    
///////UPDATE TEST/////////////
describe("Update Test", () => {
    let updater;
    beforeEach(done => {
        updater = new Student({ name: "Updater" })
        updater.save().then(() => done());
    })
    it('Set n Save test', done => {
        updater.set('name', "UpUpdater");
        updater.save()
            .then(() => Student.find({}))
            .then(students => {
                assert(students[0].name !== 'Updater');
                assert(students[0].name === 'UpUpdater');
                done();
        })
    })
})