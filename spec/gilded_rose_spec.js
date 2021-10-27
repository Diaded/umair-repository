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

    describe('Dealing with back stage passes', () => {
      it("quality of backstage passes should increase when sell in days get smaller", () => {
        items = []
        let sell_in = 25
        let quality = 50
        items.push(new Item('Backstage passes', sell_in, quality))

        update_quality()

        expect(items[0].quality).toEqual(51)

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
        let quality = 50
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

    

});
