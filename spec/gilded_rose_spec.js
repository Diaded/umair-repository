describe("Gilded Rose", function() {

  describe("Check for proper types", () => {
      it("if proper types are not present throw error", () => {
        items = []
        items.push(new Item('', '', ''))
        expect(update_quality).toThrow(typeError)
      })

      it('if quality is less then 0 throw error', () => {
        items = []
        items.push(new Item('', 10, -1))
        expect(update_quality).toThrow(qualityError)
      })
    })

    describe('Items quality should never be more then 50 except sulfuras', () => {
      it('throw an error if item quality is over 50', () => {
        items = []
        items.push(new Item('Aged Brie', 10, 51))

        expect(update_quality).toThrow(maxQualityError)
      })

      it('non sulfura items should not go over 50', ()=> {
        items = []
        items.push(new Item('Aged Brie', 10, 50))

        update_quality()
        expect(items[0].quality).toEqual(50)
        expect(items[0].sell_in).toEqual(9)
      })

      it('non sulfura items should not go over 50', ()=> {
        items = []
        items.push(new Item('Backstage passes', 10, 50))

        update_quality()
        expect(items[0].quality).toEqual(50)
        expect(items[0].sell_in).toEqual(9)
      })

      it('checking for iteration with aged brie', ()=> {
        items = []
        items.push(new Item('Aged Brie', 10, 49))

        update_quality()
        expect(items[0].quality).toEqual(50)
        expect(items[0].sell_in).toEqual(9)

        update_quality()
        expect(items[0].quality).toEqual(50)
        expect(items[0].sell_in).toEqual(8)
      })

      it('checking for iteration with backstage passes', ()=> {
        items = []
        items.push(new Item('Backstage passes', 10, 50))

        update_quality()
        expect(items[0].quality).toEqual(50)
        expect(items[0].sell_in).toEqual(9)

        update_quality()
        expect(items[0].quality).toEqual(50)
        expect(items[0].sell_in).toEqual(8)
      })

    })

    describe('Dealing with back stage passes', () => {
      it("quality of backstage passes should increase when sell in days get smaller", () => {
        items = []
        let sell_in = 25
        let quality = 40
        items.push(new Item('Backstage passes', sell_in, quality))

        update_quality()

        expect(items[0].quality).toEqual(41)

      })
      it("quality of backstage passes should increase twice as fast if sell_in day is within 10", () => {
        items = []
        let sell_in = 10
        let quality = 20
        items.push(new Item('Backstage passes', sell_in, quality))
  
        update_quality()
        expect(items[0].quality).toEqual(22)
  
      })
  
      it("quality of backstage passes should increase three times as fast if sell_in day is within 5", () => {
        items = []
        let sell_in = 5
        let quality = 20
        items.push(new Item('Backstage passes', sell_in, quality))
  
        update_quality()
        expect(items[0].quality).toEqual(23)
  
      })
  
      it("quality of backstage passes should drop to 0 if sell_in day is 0 or less", () => {
        items = []
        let sell_in = 1
        let quality = 40
        items.push(new Item('Backstage passes', sell_in, quality))
  
        update_quality()
        expect(items[0].quality).toEqual(0)
  
      })

      it("if sell_in days for backstage passes is already 0 or less its quality should be 0", () => {
        items = []
        let sell_in = 0
        let quality = 25
        items.push(new Item('Backstage passes', sell_in, quality))

        expect(update_quality).toThrow(backStageQualityError)
      })
    })

    describe('handling sulfras items', () => {

      it('sulfras items should always be 80', () => {
        items = []
        let sell_in = 0
        let quality = 50
        items.push(new Item('Sulfuras', sell_in, quality))

        expect(update_quality).toThrow(sulfrasQualityError)
      })

      it('sulfras items quality should not alter as sell in decreases', ()=> {

        items=[]
        let sell_in = 10
        let quality = 80
        items.push(new Item('Sulfuras', sell_in, quality))
        
        update_quality()
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(80)
      })

    })

    describe('handle aged brie', () => {

      it('aged brie quality should go up as sell in days go down', () => {
        items = []
        let sell_in = 10
        let quality = 10
        items.push(new Item('Aged Brie', sell_in, quality))
        
        update_quality()
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(11)
      })

    })

    describe('handle conjured items', () => {
      it('conjured items should decrease twice as fast', () => {
        items = []
        let sell_in = 10
        let quality = 10

        items.push(new Item('Conjured Mana Cake', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(8)
      })

      it('conjured itesm should decrease by 4 when sell_in is under 0', () => {
        items = []
        let sell_in = 0
        let quality = 10

        items.push(new Item('Conjured Mana Cake', sell_in, quality))
        update_quality()
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(6)

      })

      it('conjured item quality should not fall below 0', () => {
        items = []
        let sell_in = 10
        let quality = 0

        items.push(new Item('Conjured Mana Cake', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(0)
      })

      it('testing conjured item iteratively', () => {
        items = []

        let sell_in = 2
        let quality = 6
        items.push(new Item('Conjured Mana Cake', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(1)
        expect(items[0].quality).toEqual(4)

        update_quality()
        expect(items[0].sell_in).toEqual(0)
        expect(items[0].quality).toEqual(0)

        update_quality()
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(0)


      })
    })

    describe('all other items', () => {
      it('all other items should decrease by 1 when sell_in days are above 0', () => {
        items = []
        let sell_in = 2
        let quality = 10

        items.push(new Item('Elixir of the Mongoose', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(1)
        expect(items[0].quality).toEqual(9)

      })

      it('all other items should decrease by 2 when sell_in days are 0 or below', () => {
        items = []
        let sell_in = 0
        let quality = 10

        items.push(new Item('Elixir of the Mongoose', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(8)

      })

      it('other item quality should not fall below 0', () => {
        items = []
        let sell_in = 10
        let quality = 0

        items.push(new Item('Elixir of the Mongoose', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(0)
      })

      it('testing other item iteratively', () => {
        items = []

        let sell_in = 2
        let quality = 3
        items.push(new Item('Elixir of the Mongoose', sell_in, quality))

        update_quality()
        expect(items[0].sell_in).toEqual(1)
        expect(items[0].quality).toEqual(2)

        update_quality()
        expect(items[0].sell_in).toEqual(0)
        expect(items[0].quality).toEqual(0)

        update_quality()
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(0)


      })

    })
    

});
