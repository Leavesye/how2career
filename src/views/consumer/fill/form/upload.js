export function upload (h) { 
  return (
    <div class="flex-vc">
      <div style=" width: 80px;height: 80px;background: #F6F6F6;border-radius: 2px;border: 1px dashed #CCCCCC;">
        <p style="margin-top: 12px; height: 22px;"><i class="el-icon-plus"></i></p>
        <div style="color: #9B9B9B;font-size: 14px">上传证书</div>
      </div>
      <div style="margin-left: 10px;color: #9B9B9B;font-size: 14px">支持格式：pdf.jpg.jpeg.png.bmp,不大于2M</div>
    </div>
  )
}