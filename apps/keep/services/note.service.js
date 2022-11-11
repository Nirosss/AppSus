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
        info: {
          txt: 'Laudate Dominum omnes gentes Laudate eum, omnes populi Quoniam confirmata est Super nos misericordia eius Et veritas, veritas Domini manet, manet in aeternum Gloria Patri et Filio Et Spiritui Sancto Sicut erat in principio Et nunc, et semper Et in saecula saeculorum',
        },
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
        info: {
          url: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/649360-gettyimages-1257218804-2dcca7c37b9738aa461ba0e311c25721.jpg',
          title: 'Bobi and Me',
        },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n107',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'What is Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
      },
      {
        id: 'n108',
        type: 'note-img',
        info: {
          url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/B875/production/_102512274_gettyimages-518360318.jpg',
          title: 'Bobi and Me',
        },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n109',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Coding liscence', doneAt: null },
            { txt: 'Power cord', doneAt: 199111111 },
          ],
        },
      },
      {
        id: 'n110',
        type: 'note-img',
        info: {
          url: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/649360-gettyimages-1257218804-2dcca7c37b9738aa461ba0e311c25721.jpg',
          title: 'Bobi and Me',
        },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n111',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'What is Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
      },
      {
        id: 'n112',
        type: 'note-img',
        info: {
          url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/15242/production/_109249568_hi057324948.jpg',
          title: 'Bobi and Me',
        },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n119',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Finish This Sprint', doneAt: 1995111111 },
            { txt: 'Coding powder', doneAt: 187111111 },
          ],
        },
      },
    ]
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  return notes
}
