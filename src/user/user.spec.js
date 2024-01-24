import makeFakeUser from "../../test/fixtures/users.js"
import makeUser from "./user.js"

describe('users', () => {
  it('should have a name', () => {
    const user = makeFakeUser({ name: null })
    expect(() => makeUser(user)).toThrow('User must have a name.')
  });
  it('should have an email', () => {
    const user = makeFakeUser({ email: null })
    expect(() => makeUser(user)).toThrow('User must have an email.')
  });
  it('should have a password', () => {
    const user = makeFakeUser({ password: null })
    expect(() => makeUser(user)).toThrow('User must have a password.')
  });
  it('must have a source', () => {
    const noSource = makeFakeUser({ source: undefined })
    expect(() => makeUser(noSource)).toThrow('User must have a source.')
  })
  it('must have a source ip', () => {
    const noIp = makeFakeUser({ source: { ip: undefined } })
    expect(() => makeUser(noIp)).toThrow(
      'User source must contain an IP.'
    )
  })
  it('can have a source browser', () => {
    const withBrowser = makeFakeUser()
    expect(
      makeUser(withBrowser)
        .getSource()
        .getBrowser()
    ).toBe(withBrowser.source.browser)
  })
  it('can have a source referrer', () => {
    const withRef = makeFakeUser()
    expect(
      makeUser(withRef)
        .getSource()
        .getReferrer()
    ).toBe(withRef.source.referrer)
  })
});