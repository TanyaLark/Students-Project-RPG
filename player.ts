class Player {
  public name: string;
  private login: string;
  private password: string;
  public character: string;
  public id: string;


  constructor(name: string,
              logon: string,
              password: string,
              character: string,
              id: string) {
    this.name = name;
    this.login = logon;
    this.password = password;
    this.character = character;
    this.id = id;
  }
}