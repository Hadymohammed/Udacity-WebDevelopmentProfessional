var allSection=document.getElementsByClassName('section');
var navItems=document.getElementsByClassName('navItem');
let navIdxMap=new Map();
let navBar;
let navBarHeight;
function createSection(title,text,imgPath){
    var mainDiv=document.createElement('div');
    mainDiv.className='section';

    var textContainer=document.createElement('div');
    textContainer.className='sectionText';

    var sectionTitle=document.createElement('div');
    sectionTitle.className='Sectiontitle';

    var line=document.createElement('div');
    line.className='sectionTitleLine';

    var para=document.createElement('p');
    para.innerText=text;

    sectionTitle.innerText=title;
    sectionTitle.appendChild(line);
    textContainer.appendChild(sectionTitle);
    textContainer.appendChild(para);
    
    var imageContainer=document.createElement('div');
    imageContainer.className='SectionImg';
    var image=document.createElement('img');
    image.src=imgPath;

    imageContainer.appendChild(image);

    mainDiv.appendChild(textContainer);
    mainDiv.appendChild(imageContainer);

    // render new section and navItem to screen
    addNavItem(title);
    document.getElementById('sectionsBox').appendChild(mainDiv);
    //add EventListener
    addScrollEvent(navItems.length-1);
    //add observer
    addObserverTo(mainDiv);

}

function addNavItem(title){
   var mainDiv=document.createElement('div');
   mainDiv.className='navItem';
   var link=document.createElement('div');
   link.innerText=title;

   mainDiv.appendChild(link);
   navIdxMap.set(mainDiv,navItems.length);//add to index map
   document.getElementById('navContent').appendChild(mainDiv);
}

//get axis
function getTop(item){
    return item.offsetTop;
}
function getHeight(item){
    return item.offsetHeight;
}


function scrollTo(idx){
    navBar=document.getElementById('navContent');
    navBarHeight=getHeight(navBar)+2;

    window.scroll({
        top:getTop(allSection[idx])-navBarHeight,
        left:0,
        behavior:'smooth'
    })
}

function addScrollEvent(idx){
    navItems[idx].addEventListener('click',()=>{
        var i=navIdxMap.get(navItems[idx]);//get section index by navItem
        //console.log(navItems[idx]);
        //console.log(i);
        scrollTo(i);  
    });
}
function addObserverTo(item){
    var observer=new IntersectionObserver(entries =>{
        entries.forEach(entry=>{
            entry.target.classList.toggle("active",entry.isIntersecting)
        })
    },{
        threshold:1
    });

    observer.observe(item);
}

function runMainFunctions(){
    //add scroll event listener to all navItems
    //add Observers
    for (const section of allSection) {
        addObserverTo(section);
    }
    for(var i=0;i<navItems.length;i++) {
        navIdxMap.set(navItems[i],i);
        addScrollEvent(i);
    }
}