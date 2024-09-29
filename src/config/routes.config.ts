class ROUTES {
  private BASE_URL = String(process.env.NEXT_PUBLIC_BASE_URL)

  HOME = this.BASE_URL
  PRODUCT = `${this.BASE_URL}/product`
  CHECKOUT = `${this.BASE_URL}/checkout`
}

export const route = new ROUTES()
