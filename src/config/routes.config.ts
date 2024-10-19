class ROUTES {
  private BASE_URL = String(process.env.NEXT_PUBLIC_BASE_URL)

  HOME = this.BASE_URL
  PROFILE = `${this.BASE_URL}/profile`
  PRODUCT = `${this.BASE_URL}/product`
  CHECKOUT = `${this.BASE_URL}/checkout`
  THANKS = `${this.CHECKOUT}/thanks`
  ABOUT = `${this.BASE_URL}/about`
  DONATE = `${this.BASE_URL}/donate`
  UNAUTHORIZED = `${this.BASE_URL}/unauthorized`
  ACTIVATE = `${this.BASE_URL}/api/auth/activate`

  SITEMAP = `${this.BASE_URL}/sitemap.xml`
}

export const route = new ROUTES()
