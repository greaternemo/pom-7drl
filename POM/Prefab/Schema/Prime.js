// POM.Prefab.Schema.Prime
// Prime schema to be imported into the data registry

// Here's the way this should work:
// We have a lot of things we need to store in the data registry
// and we need to be able to reference them quickly and consistently.
// Some of our key data will be available as global constants. 
// Those constants will contain ONLY an immutable integer ID.
// That integer ID will be the key pointing to the related value in
// the data registry. 

// Is this a little roundabout? 
// In some cases, it will be. But it will ALWAYS be consistent and reliable.

// Additionally, some entries in the data registry will just be lists of 
// the IDs of related sets of game objects. 