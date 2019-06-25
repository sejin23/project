import axios from 'axios';

export const tryLogin = ({email, password}) => axios.post('/api/auth/login', {email: email, pw: password})
export const getUserinfo = ({email, password}) => axios.post('/api/auth/infomation', {email: email, pw: password})
export const getRelated = ({uid}) => axios.post('/api/auth/related', {uid: uid})
export const registerUser = ({univ, depart, age, email, pw, date}) => axios.post('/api/auth/register', {univ: univ, depart: depart, age: age, email: email, pw: pw, made: date})

export const getUid = ({email, password}) => axios.post('/api/auth/userinfo', {email: email, pw: password})
export const leaveUser = ({email, password}) => axios.post('/api/auth/leave', {email: email, pw: password})
export const uploadPost = ({email, pw, univ, classes, prof, title, descript}) => axios.post('/api/auth/upload/post', {email: email, pw: pw, univ: univ, classes: classes, prof: prof, title: title, script: descript})
export const sendImage = ({data}) => axios.post('/api/auth/upload/images', data, {headers: {'content-type': 'multipart/form-data'}})
export const attachComment = ({uid, aid, pid, msg, imog, voted}) => axios.post('/api/auth/upload/comments', {uid: uid, aid: aid, pid: pid, msg: msg, imog: imog, voted: voted})

export const getComment = ({uid}) => axios.get(`/api/auth/load/comment?uid=${uid}`)
export const loadImage = ({name}) => axios.get(`/api/auth/load/images?name=${name}`)
export const showPosting = () => axios.get('/api/auth/load/timeline')
export const searchImg = ({search}) => axios.get(`/api/auth/load/search?search=${search}`)
export const aPosting = ({pid}) => axios.get(`/api/auth/load/posting?pid=${pid}`)
export const resultlikes = ({pid}) => axios.get(`/api/auth/load/result?pid=${pid}`)
export const getlikelist = ({uid, pid}) => axios.post('/api/auth/load/likelist', {uid: uid, pid: pid})

export const deletecomment = ({wid, aid, pid, voted}) => axios.post('/api/auth/delet/comment', {wid: wid, aid: aid, pid: pid, voted: voted})
export const deletepost = ({pid}) => axios.get(`/api/auth/delet/post?pid=${pid}`)
