import sys
sys.path.insert(0,'/tmp/leminou-qr-deps')
import qrcode
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from pathlib import Path
out=Path('output/pdf')
for name,file in [('Bold','Arial Rounded Bold.ttf'),('Regular','Arial.ttf'),('SansBold','Arial Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'/System/Library/Fonts/Supplemental/'+file))
cream=HexColor('#FFF7EB'); pink=HexColor('#F4B9CE'); plum=HexColor('#4D2549')
url='https://leminou-chi.com/request-care'
qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q,border=4,box_size=16)
qr.add_data(url); qr.make(fit=True)
matrix=qr.get_matrix()
c=canvas.Canvas(str(out/'le-minou-neighborhood-flyer.pdf'),pagesize=(612,792))
c.setTitle('Le Minou | Cat care & dog walks'); c.setAuthor('Le Minou')
c.setFillColor(cream); c.roundRect(27,27,558,738,18,fill=1,stroke=0)
def text(y,s,size,font='Regular'):
    c.setFillColor(plum); c.setFont(font,size); c.drawCentredString(306,y,s)
# Small friendly paw mark.
c.setFillColor(pink)
c.ellipse(294,704,318,723,fill=1,stroke=0)
for x,y,r in [(291,730,5),(302,737,5),(314,736,5),(324,728,5)]: c.circle(x,y,r,fill=1,stroke=0)
text(640,'Le Minou',78,'Bold')
text(583,'Cat care & dog walks',36,'Bold')
text(552,'Chicago’s North Side',20)
c.setFillColor(pink); c.roundRect(66,405,480,108,20,fill=1,stroke=0)
text(486,'CAT VISITS & DOG WALKS',12,'SansBold')
text(448,'$28',37,'Bold') if False else None
# Clear two-column price treatment.
for x,price,duration in [(190,'$28','30 minutes'),(422,'$45','60 minutes')]:
    c.setFillColor(plum);c.setFont('Bold',38);c.drawCentredString(x,449,price)
    c.setFont('Regular',16);c.drawCentredString(x,426,duration)
c.setStrokeColor(plum);c.setLineWidth(0.6);c.line(306,428,306,477)
text(367,'Hi, I’m Erin.',20,'Bold')
text(342,'I personally handle every visit and walk.',17)
# Vector QR, with the standard four-module white quiet zone.
size=176; x0=218; y0=141; module=size/len(matrix)
c.setFillColor(HexColor('#FFFFFF'));c.rect(x0,y0,size,size,fill=1,stroke=0)
c.setFillColor(plum)
for row,values in enumerate(matrix):
    for col,bit in enumerate(values):
        if bit: c.rect(x0+col*module,y0+(len(matrix)-row-1)*module,module,module,fill=1,stroke=0)
c.linkURL(url,(x0,y0,x0+size,y0+size),relative=0,thickness=0)
text(115,'Scan to request care',19,'Bold')
text(77,'leminou-chi.com',18,'SansBold')
text(54,'erin.elizabeth@leminou-chi.com',14)
c.showPage();c.save()
print('Created letter-size vector PDF with embedded fonts and vector QR.')
