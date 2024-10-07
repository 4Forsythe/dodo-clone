class ROUTES {
  private BASE_URL = String(process.env.NEXT_PUBLIC_BASE_URL)

  HOME = this.BASE_URL
  PROFILE = `${this.BASE_URL}/profile`
  PRODUCT = `${this.BASE_URL}/product`
  CHECKOUT = `${this.BASE_URL}/checkout`
  THANKS = `${this.BASE_URL}/thanks`
  UNAUTHORIZED = `${this.BASE_URL}/unauthorized`
  ACTIVATE = `${this.BASE_URL}/api/auth/activate`
}

export const route = new ROUTES()
