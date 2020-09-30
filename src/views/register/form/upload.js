import uploadImg from '@/assets/avatar-upload.png'
export function upload (h) { 
  return (
    <el-Image style="width: 90px; height: 90px" src={uploadImg}></el-Image>
  )
}