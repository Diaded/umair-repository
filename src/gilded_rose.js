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


function handle_backstage_passes(item) {

  item.sell_in -= 1

  if(item.sell_in <= 10) item.quality +=2
  else item.quality +=1
  
}

function update_quality() {

  for (const item of items) {
    
    if(!Number.isInteger(item.sell_in) || !Number.isInteger(item.quality)) throw typeError
    if(item.quality < 0) throw qualityError

    if(item.name.includes("Backstage passes"))  handle_backstage_passes(item)


  }
}
