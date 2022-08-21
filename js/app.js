let allSection=document.getElementsByClassName('section');
let allSectionTitle=document.getElementsByClassName('Sectiontitle');
let navItems=[];
let navIdxMap=new Map();
let navBar;
let navBarHeight;
function createSection(title,text,imgPath){
    let mainDiv=document.createElement('div');
    mainDiv.className='section';

    let textContainer=document.createElement('div');
    textContainer.className='sectionText';

    let sectionTitle=document.createElement('div');
    sectionTitle.className='Sectiontitle';

    let line=document.createElement('div');
    line.className='sectionTitleLine';

    let para=document.createElement('p');
    para.innerText=text;

    sectionTitle.innerText=title;
    sectionTitle.appendChild(line);
    textContainer.appendChild(sectionTitle);
    textContainer.appendChild(para);
    
    let imageContainer=document.createElement('div');
    imageContainer.className='SectionImg';
    let image=document.createElement('img');
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
    let mainListItem=document.createElement('li');
    mainListItem.className='navItem';
    let link=document.createElement('a');

    link.innerText=title;
    //prevent ancor link actions
    //link.addEventListener('click',preventDefault);
    //console.log(mainListItem);
    navItems.push(mainListItem);
    mainListItem.appendChild(link);
    navIdxMap.set(mainListItem,navItems.length-1);//add to index map
    document.getElementById('navContent').appendChild(mainListItem);
}
function getSectionTitle(idx){
    return allSectionTitle[idx].innerText;
}
//Build nabBar dynamically 
function generateNavBar(){
    //console.log(allSection);
    for(let i=0;i<allSection.length;i++){
        let title=getSectionTitle(i);
        addNavItem(title);
    }
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
        let i=navIdxMap.get(navItems[idx]);//get section index by navItem
        scrollTo(i);  
    });
}
function addObserverTo(item){
    let observer=new IntersectionObserver(entries =>{
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
    generateNavBar();

    //add Observers
    for (const section of allSection) {
        addObserverTo(section);
    }
    for(let i=0;i<navItems.length;i++) {
        //build index map
        navIdxMap.set(navItems[i],i);
        //add scroll event
        addScrollEvent(i);
    }
}
