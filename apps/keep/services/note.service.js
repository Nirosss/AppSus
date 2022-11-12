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
  console.log('we got note', note.info.txt)
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
        style: { backgroundColor: '#f28b82' },
      },
      {
        id: 'n103',
        type: 'note-txt',
        isPinned: true,
        info: { txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n104',
        type: 'note-video',
        info: {
          url: 'https://www.youtube.com/embed/xbasufPxHPs',
          title: 'חיית הברזל',
        },
        style: { backgroundColor: '#e8eaed' },
      },
      {
        id: 'n105',
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
        type: 'note-img',
        info: {
          url: 'https://images.immediate.co.uk/production/volatile/sites/18/2018/12/GettyImages-594833393-11fe4fe.jpg?quality=90&crop=246px,0px,2447px,1630px&fit=700,466',
          title: 'Home is where the grass is',
        },
        style: { backgroundColor: '#fbbc04' },
      },
      {
        id: 'n107',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: "They are waiting to take us into \n The severed garden \n Do you know how pale and wanton thrillful \n Comes death on a strange hour \nUnannounced, unplanned for\nLike a scaring over-friendly guest\nYou've brought to bed\nDeath makes angels of us all\nAnd gives us wings\nWhere we had shoulders\nSmooth as raven's claws\nNo more money, no more fancy dress\nThis other kingdom seems by far the best\nUntil its other jaw reveals incest\nAnd loose obedience to a vegetable law\nI will not go\nPrefer a feast of friends\nTo the giant family",
        },
      },
      {
        id: 'n108',
        type: 'note-img',
        info: {
          url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/B875/production/_102512274_gettyimages-518360318.jpg',
          title: 'Me',
        },
        style: { backgroundColor: '#fdcfe8' },
      },
      {
        id: 'n109',
        type: 'note-video',
        info: {
          url: 'https://www.youtube.com/embed/pD0HqG24W4k',
          title: 'Best of de andre',
        },
        style: { backgroundColor: '#e8eaed' },
      },
      {
        id: 'n110',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: "Dormi sepolto in un campo di grano\nNon è la rosa, non è il tulipano\nChe ti fan veglia dall'ombra dei fossi\nMa son mille papaveri rossi\nLungo le sponde del mio torrente\nVoglio che scendano i lucci argentati\nNon più i cadaveri dei soldati\nPortati in braccio dalla corrente\nCosì dicevi ed era d'inverno\nE come gli altri verso l'inferno\nTe ne vai triste come chi deve\nIl vento ti sputa in faccia la neve\nFermati Piero, fermati adesso\nLascia che il vento ti passi un po' addosso\nDei morti in battaglia ti porti la voce\nChi diede la vita ebbe in cambio una croce\nMa tu non lo udisti e il tempo passava\nCon le stagioni a passo di giava\nEd arrivasti a varcar la frontiera\nIn un bel giorno di primavera\n" ,
        },
      },
      {
        id: 'n111',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Finish This Sprint', doneAt: 1995111111 },
            { txt: 'Coding powder', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n112',
        type: 'note-img',
        info: {
          url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/15242/production/_109249568_hi057324948.jpg',
          title: '바부 and She',
        },
        style: { backgroundColor: '#e6c9a8' },
      },
      {
        id: 'n114',
        type: 'note-img',
        info: {
          url: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/649360-gettyimages-1257218804-2dcca7c37b9738aa461ba0e311c25721.jpg',
          title: 'Bobby Mcgee',
        },
        style: { backgroundColor: '#d7aefb' },
      },
    ]
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  return notes
}

function createNote(){
  
}