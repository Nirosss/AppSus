import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notes'
_createNotes()

export const notesService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
}

function query() {
  return storageService.query(NOTES_KEY)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function getEmptyNote() {
  return { id: '', name: '' }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: { txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n102',
        type: 'note-img',
        info: {
          url: 'https://pyxis.nymag.com/v1/imgs/b43/b2c/4c644da1f8f1d6ecfa62127c29a4622f66-trump-horse.2x.rsocial.w600.jpg',
          title: 'Bobi and Me',
        },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n103',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n106',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        type: 'note-txt',
        isPinned: true,
        info: { txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n105',
        type: 'note-img',
        info: { url: 'http://some-img/me', title: 'Bobi and Me' },
        style: { backgroundColor: '#00d' },
      },
    ]
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  console.log(notes)
  return notes
}
