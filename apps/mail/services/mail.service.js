import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import gMails from '../../../data/emails.json' assert {type: 'json'}


const Mail_KEY = 'mailDB'
_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId
}

function query() {
    return storageService.query(Mail_KEY)
}

function get(mailId) {
    return storageService.get(Mail_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(Mail_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(Mail_KEY, mail)
    } else {
        mail.from = loggedinUser.email
        mail.name = "Me"
        mail.sentAt = Date.now()
        return storageService.post(Mail_KEY, mail)
    }
}

function getEmptyMail(sender, title, body) {
    return { id: '', sender, title, body }
}


function getNextMailId(mailId) {
    return storageService.query(Mail_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(Mail_KEY)
    if (!mails || !mails.length) {
        mails = gMails
        // mails.push(_createMail('a.hoffman.lon@gmail.com', 'checking', "will this work? who knows"))
        // mails.push(_createMail('b.rivka.lon@gmail.com', 'Yes', "ofc it will"))
        // mails.push(_createMail('c.asdcasdasf.lon@gmail.com', 'checking', "will this work? who knows"))
        // mails.push(_createMail('d.DSDSD.lon@gmail.com', 'Yo', "will this work? who knows"))
        // mails.push(_createMail('d.sdfsdfs.lon@gmail.com', 'checking', "will this work? who knows"))

        utilService.saveToStorage(Mail_KEY, mails)
    }
    return mails
}

function _createMail(sender, title, body) {
    const mail = getEmptyMail(sender, title, body)
    mail.id = utilService.makeId()
    return mail
}
