function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

const typeError = 'Improper types are present Item keys'
const qualityError = 'Quality is less then 0'
const backStageQualityError = 'incorrect quality for backstage passes'
const sulfrasQualityError = 'incorrect quality of sulfras item'
const maxQualityError = 'quality for non sulfura items should never be more then 50'

function handle_backstage_passes(item) {
  if(item.sell_in <= 0 && item.quality > 0) throw backStageQualityError

  item.sell_in -= 1

  if(item.quality === 50 && item.sell_in > 0) console.log('nothing will happen here') 
  else if(item.sell_in <= 0) item.quality = 0
  else if(item.sell_in <= 5) item.quality +=3
  else if(item.sell_in <= 10) item.quality +=2
  else item.quality +=1
}

function handle_sulfras(item) {
  if(item.quality!==80) throw sulfrasQualityError
  item.sell_in -=1
}

function handle_aged_brie(item) {
  item.sell_in -=1
  if(item.quality < 50) item.quality +=1
}

function handle_conjured_item(item) {
  item.sell_in -=1
  if(item.quality!==0) {
    if(item.sell_in <= 0)item.quality -=4
    else item.quality -=2
  }
}

function handle_other_item(item) {
  item.sell_in -=1
  if(item.quality!==0) {
    if(item.sell_in <= 0) item.quality -=2
    else item.quality -=1
  }
}

function update_quality() {

  for (const item of items) {
    
    if(!Number.isInteger(item.sell_in) || !Number.isInteger(item.quality)) throw typeError
    if(item.quality < 0) throw qualityError
    if(item.quality > 50 && !item.name.includes('Sulfuras')) throw maxQualityError
     

    if(item.name.includes("Backstage passes"))  handle_backstage_passes(item)
    else if(item.name.includes('Sulfuras')) handle_sulfras(item)
    else if(item.name === "Aged Brie") handle_aged_brie(item)
    else if(item.name.includes('Conjured')) handle_conjured_item(item)
    else handle_other_item(item)
  }
}
