/* ExtInfoWindow, v1.1: See code.google.com/p/gmaps-utility-library for license and info */
function ExtInfoWindow(a,b,c,d){this.html_=c;this.marker_=a;this.infoWindowId_=b;this.options_=d==null?{}:d;this.ajaxUrl_=this.options_.ajaxUrl==null?null:this.options_.ajaxUrl;this.callback_=this.options_.ajaxCallback==null?null:this.options_.ajaxCallback;this.borderSize_=this.options_.beakOffset==null?0:this.options_.beakOffset;this.paddingX_=this.options_.paddingX==null?0+this.borderSize_:this.options_.paddingX+this.borderSize_;this.paddingY_=this.options_.paddingY==null?0+this.borderSize_:this.options_.paddingY+this.borderSize_;this.map_=null;this.container_=document.createElement('div');this.container_.style.position='relative';this.container_.style.display='none';this.contentDiv_=document.createElement('div');this.contentDiv_.id=this.infoWindowId_+'_contents';this.contentDiv_.innerHTML=this.html_;this.contentDiv_.style.display='block';this.contentDiv_.style.visibility='hidden';this.wrapperDiv_=document.createElement('div')};
ExtInfoWindow.prototype=new GOverlay();
ExtInfoWindow.prototype.initialize=function(a){this.map_=a;this.defaultStyles={containerWidth:this.map_.getSize().width/2,borderSize:1};this.wrapperParts={tl:{t:0,l:0,w:0,h:0,domElement:null},t:{t:0,l:0,w:0,h:0,domElement:null},tr:{t:0,l:0,w:0,h:0,domElement:null},l:{t:0,l:0,w:0,h:0,domElement:null},r:{t:0,l:0,w:0,h:0,domElement:null},bl:{t:0,l:0,w:0,h:0,domElement:null},b:{t:0,l:0,w:0,h:0,domElement:null},br:{t:0,l:0,w:0,h:0,domElement:null},beak:{t:0,l:0,w:0,h:0,domElement:null},close:{t:0,l:0,w:0,h:0,domElement:null}};for(var i in this.wrapperParts){var b=document.createElement('div');b.id=this.infoWindowId_+'_'+i;b.style.visibility='hidden';document.body.appendChild(b);b=document.getElementById(this.infoWindowId_+'_'+i);var c=eval('this.wrapperParts.'+i);c.w=parseInt(this.getStyle_(b,'width'));c.h=parseInt(this.getStyle_(b,'height'));document.body.removeChild(b)}for(var i in this.wrapperParts){if(i=='close'){this.wrapperDiv_.appendChild(this.contentDiv_)}var d=null;if(this.wrapperParts[i].domElement==null){d=document.createElement('div');this.wrapperDiv_.appendChild(d)}else{d=this.wrapperParts[i].domElement}d.id=this.infoWindowId_+'_'+i;d.style.position='absolute';d.style.width=this.wrapperParts[i].w+'px';d.style.height=this.wrapperParts[i].h+'px';d.style.top=this.wrapperParts[i].t+'px';d.style.left=this.wrapperParts[i].l+'px';this.wrapperParts[i].domElement=d}this.map_.getPane(G_MAP_FLOAT_PANE).appendChild(this.container_);this.container_.id=this.infoWindowId_;var e=this.getStyle_(document.getElementById(this.infoWindowId_),'width');this.container_.style.width=(e==null?this.defaultStyles.containerWidth:e);this.map_.getContainer().appendChild(this.contentDiv_);this.contentWidth=this.getDimensions_(this.container_).width;this.contentDiv_.style.width=this.contentWidth+'px';this.contentDiv_.style.position='absolute';this.container_.appendChild(this.wrapperDiv_);GEvent.bindDom(this.container_,'mousedown',this,this.onClick_);GEvent.trigger(this.map_,'extinfowindowopen');if(this.ajaxUrl_!=null){this.ajaxRequest_(this.ajaxUrl_)}};
ExtInfoWindow.prototype.onClick_=function(e){if(navigator.userAgent.toLowerCase().indexOf('msie')!=-1&&document.all){window.event.cancelBubble=true;window.event.returnValue=false}else{e.preventDefault();e.stopPropagation()}};
ExtInfoWindow.prototype.remove=function(){if(this.map_.getExtInfoWindow()!=null){GEvent.trigger(this.map_,'extinfowindowbeforeclose');GEvent.clearInstanceListeners(this.container_);if(this.container_.outerHTML){this.container_.outerHTML=''}if(this.container_.parentNode){this.container_.parentNode.removeChild(this.container_)}this.container_=null;GEvent.trigger(this.map_,'extinfowindowclose');this.map_.setExtInfoWindow_(null)}};
ExtInfoWindow.prototype.copy=function(){return new ExtInfoWindow(this.marker_,this.infoWindowId_,this.html_,this.options_)};
ExtInfoWindow.prototype.redraw=function(a){if(!a||this.container_==null)return;var b=this.contentDiv_.offsetHeight;this.contentDiv_.style.height=b+'px';this.contentDiv_.style.left=this.wrapperParts.l.w+'px';this.contentDiv_.style.top=this.wrapperParts.tl.h+'px';this.contentDiv_.style.visibility='visible';this.wrapperParts.tl.t=0;this.wrapperParts.tl.l=0;this.wrapperParts.t.l=this.wrapperParts.tl.w;this.wrapperParts.t.w=(this.wrapperParts.l.w+this.contentWidth+this.wrapperParts.r.w)-this.wrapperParts.tl.w-this.wrapperParts.tr.w;this.wrapperParts.t.h=this.wrapperParts.tl.h;this.wrapperParts.tr.l=this.wrapperParts.t.w+this.wrapperParts.tl.w;this.wrapperParts.l.t=this.wrapperParts.tl.h;this.wrapperParts.l.h=b;this.wrapperParts.r.l=this.contentWidth+this.wrapperParts.l.w;this.wrapperParts.r.t=this.wrapperParts.tr.h;this.wrapperParts.r.h=b;this.wrapperParts.bl.t=b+this.wrapperParts.tl.h;this.wrapperParts.b.l=this.wrapperParts.bl.w;this.wrapperParts.b.t=b+this.wrapperParts.tl.h;this.wrapperParts.b.w=(this.wrapperParts.l.w+this.contentWidth+this.wrapperParts.r.w)-this.wrapperParts.bl.w-this.wrapperParts.br.w;this.wrapperParts.b.h=this.wrapperParts.bl.h;this.wrapperParts.br.l=this.wrapperParts.b.w+this.wrapperParts.bl.w;this.wrapperParts.br.t=b+this.wrapperParts.tr.h;this.wrapperParts.close.l=this.wrapperParts.tr.l+this.wrapperParts.tr.w-this.wrapperParts.close.w-this.borderSize_;this.wrapperParts.close.t=this.borderSize_;this.wrapperParts.beak.l=this.borderSize_+(this.contentWidth/2)-(this.wrapperParts.beak.w/2);this.wrapperParts.beak.t=this.wrapperParts.bl.t+this.wrapperParts.bl.h-this.borderSize_;for(var i in this.wrapperParts){if(i=='close'){this.wrapperDiv_.insertBefore(this.contentDiv_,this.wrapperParts[i].domElement)}var c=null;if(this.wrapperParts[i].domElement==null){c=document.createElement('div');this.wrapperDiv_.appendChild(c)}else{c=this.wrapperParts[i].domElement}c.id=this.infoWindowId_+'_'+i;c.style.position='absolute';c.style.width=this.wrapperParts[i].w+'px';c.style.height=this.wrapperParts[i].h+'px';c.style.top=this.wrapperParts[i].t+'px';c.style.left=this.wrapperParts[i].l+'px';this.wrapperParts[i].domElement=c}var d=this.marker_;var e=this.map_;GEvent.addDomListener(this.wrapperParts.close.domElement,'click',function(){e.closeExtInfoWindow()});var f=this.map_.fromLatLngToDivPixel(this.marker_.getPoint());this.container_.style.position='absolute';var g=this.marker_.getIcon();this.container_.style.left=(f.x-(this.contentWidth/2)-g.iconAnchor.x+g.infoWindowAnchor.x)+'px';this.container_.style.top=(f.y-this.wrapperParts.bl.h-b-this.wrapperParts.tl.h-this.wrapperParts.beak.h-g.iconAnchor.y+g.infoWindowAnchor.y+this.borderSize_)+'px';this.container_.style.display='block';if(this.map_.getExtInfoWindow()!=null){this.repositionMap_()}};
ExtInfoWindow.prototype.resize=function(){var a=this.contentDiv_.cloneNode(true);a.id=this.infoWindowId_+'_tempContents';a.style.visibility='hidden';a.style.height='auto';document.body.appendChild(a);a=document.getElementById(this.infoWindowId_+'_tempContents');var b=a.offsetHeight;document.body.removeChild(a);this.contentDiv_.style.height=b+'px';var c=this.contentDiv_.offsetWidth;var d=this.map_.fromLatLngToDivPixel(this.marker_.getPoint());var e=this.wrapperParts.t.domElement.offsetHeight+this.wrapperParts.l.domElement.offsetHeight+this.wrapperParts.b.domElement.offsetHeight;var f=this.wrapperParts.t.domElement.offsetTop;this.wrapperParts.l.domElement.style.height=b+'px';this.wrapperParts.r.domElement.style.height=b+'px';var g=this.wrapperParts.b.domElement.offsetTop-b;this.wrapperParts.l.domElement.style.top=g+'px';this.wrapperParts.r.domElement.style.top=g+'px';this.contentDiv_.style.top=g+'px';windowTHeight=parseInt(this.wrapperParts.t.domElement.style.height);g-=windowTHeight;this.wrapperParts.close.domElement.style.top=g+this.borderSize_+'px';this.wrapperParts.tl.domElement.style.top=g+'px';this.wrapperParts.t.domElement.style.top=g+'px';this.wrapperParts.tr.domElement.style.top=g+'px';this.repositionMap_()};
ExtInfoWindow.prototype.repositionMap_=function(){var a=this.map_.fromLatLngToDivPixel(this.map_.getBounds().getNorthEast());var b=this.map_.fromLatLngToDivPixel(this.map_.getBounds().getSouthWest());var c=this.map_.fromLatLngToDivPixel(this.marker_.getPoint());var d=0;var e=0;var f=this.paddingX_;var g=this.paddingY_;var h=this.marker_.getIcon().infoWindowAnchor;var i=this.marker_.getIcon().iconAnchor;var j=this.wrapperParts.t.domElement;var k=this.wrapperParts.l.domElement;var l=this.wrapperParts.b.domElement;var m=this.wrapperParts.r.domElement;var n=this.wrapperParts.beak.domElement;var o=c.y-(-h.y+i.y+this.getDimensions_(n).height+this.getDimensions_(l).height+this.getDimensions_(k).height+this.getDimensions_(j).height+this.paddingY_);if(o<a.y){e=a.y-o}else{var p=c.y+this.paddingY_;if(p>=b.y){e=-(p-b.y)}}var q=Math.round(c.x+this.getDimensions_(this.container_).width/2+this.getDimensions_(m).width+this.paddingX_+h.x-i.x);if(q>a.x){d=-(q-a.x)}else{var r=-(Math.round((this.getDimensions_(this.container_).width/2-this.marker_.getIcon().iconSize.width/2)+this.getDimensions_(k).width+this.borderSize_+this.paddingX_)-c.x-h.x+i.x);if(r<b.x){d=b.x-r}}if(d!=0||e!=0&&this.map_.getExtInfoWindow()!=null){this.map_.panBy(new GSize(d,e))}};
ExtInfoWindow.prototype.ajaxRequest_=function(d){var e=this.map_;var f=this.callback_;GDownloadUrl(d,function(a,b){var c=document.getElementById(e.getExtInfoWindow().infoWindowId_+'_contents');if(a==null||b==-1){c.innerHTML='<span class="error">ERROR: The Ajax request failed to get HTML content from "'+d+'"</span>'}else{c.innerHTML=a}if(f!=null){f()}e.getExtInfoWindow().resize();GEvent.trigger(e,'extinfowindowupdate')})};
ExtInfoWindow.prototype.getDimensions_=function(a){var b=this.getStyle_(a,'display');if(b!='none'&&b!=null){return{width:a.offsetWidth,height:a.offsetHeight}}var c=a.style;var d=c.visibility;var e=c.position;var f=c.display;c.visibility='hidden';c.position='absolute';c.display='block';var g=a.clientWidth;var h=a.clientHeight;c.display=f;c.position=e;c.visibility=d;return{width:g,height:h}};
ExtInfoWindow.prototype.getStyle_=function(a,b){var c=false;b=this.camelize_(b);var d=a.style[b];if(!d){if(document.defaultView&&document.defaultView.getComputedStyle){var e=document.defaultView.getComputedStyle(a,null);d=e?e[b]:null}else if(a.currentStyle){d=a.currentStyle[b]}}if((d=='auto')&&(b=='width'||b=='height')&&(this.getStyle_(a,'display')!='none')){if(b=='width'){d=a.offsetWidth}else{d=a.offsetHeight}}if(window.opera&&['left','top','right','bottom'].include(b)){if(this.getStyle_(a,'position')=='static')d='auto'}return(d=='auto')?null:d};
ExtInfoWindow.prototype.camelize_=function(a){var b=a.split('-'),len=b.length;if(len==1)return b[0];var c=a.charAt(0)=='-'?b[0].charAt(0).toUpperCase()+b[0].substring(1):b[0];for(var i=1;i<len;i++){c+=b[i].charAt(0).toUpperCase()+b[i].substring(1)}return c};GMap.prototype.ExtInfoWindowInstance_=null;GMap.prototype.ClickListener_=null;GMap.prototype.InfoWindowListener_=null;
GMarker.prototype.openExtInfoWindow=function(b,c,d,e){if(b==null){throw'Error in GMarker.openExtInfoWindow: map cannot be null';return false}if(c==null||c==''){throw'Error in GMarker.openExtInfoWindow: must specify a cssId';return false}b.closeInfoWindow();if(b.getExtInfoWindow()!=null){b.closeExtInfoWindow()}if(b.getExtInfoWindow()==null){b.setExtInfoWindow_(new ExtInfoWindow(this,c,d,e));if(b.ClickListener_==null){b.ClickListener_=GEvent.addListener(b,'click',function(a){if(!a&&b.getExtInfoWindow()!=null){b.closeExtInfoWindow()}})}if(b.InfoWindowListener_==null){b.InfoWindowListener_=GEvent.addListener(b,'infowindowopen',function(a){if(b.getExtInfoWindow()!=null){b.closeExtInfoWindow()}})}b.addOverlay(b.getExtInfoWindow())}};
GMarker.prototype.closeExtInfoWindow=function(a){a.closeExtInfoWindow()};
GMap2.prototype.getExtInfoWindow=function(){return this.ExtInfoWindowInstance_};
GMap2.prototype.setExtInfoWindow_=function(a){this.ExtInfoWindowInstance_=a}
GMap2.prototype.closeExtInfoWindow=function(){this.ExtInfoWindowInstance_.remove()};
