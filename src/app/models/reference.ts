export class Reference {
  id: number;
  name: string;
  description: string;
  status: number;
  parent: Reference;
  parentId1: number;


  childs: Reference[];

  public static createReference(id: number, name: string) {
    const reference = new Reference();
    reference.id = id;
    reference.name = name;

    return reference;
  }
}
