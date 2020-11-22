# JSON DB Schema

Please familiarize yourself on how to use [node-json-db](https://github.com/Belphemur/node-json-db).

Using `/tracker` as example, the **Key** can be:

`/tracker/12/34/56/78` (`12` is the `hmwkAssignmentsId`, `34` is the `studentsId`, etc.)

... and the **Values** object can be:

```json
{
  "done": false
}
```

## `/reseed`

The data in the `/reseed` path contains subscription metadata for the reseeding monday.com recipe and `npm run reseed` script.

| <div style="width:24ch">Key</div> | <div style="width:24ch">Values</div> | Description                                        |
| --------------------------------- | ------------------------------------ | -------------------------------------------------- |
| `/reseed/${subscriptionId}`</div> | `webookUrl`                          | Subscription webhook URL (unused).                 |
| &#10240;                          | `hmwkAssignmentsId`                  | `hmwk_assignments` board ID for reseeding.         |
| &#10240;                          | `studentsId`                         | `students` board ID for reseeding.                 |
| &#10240;                          | `hmwkCompletionTrackingId`           | `hmwk_completion_tracking` board ID for reseeding. |

## `/tracker`

The data in the `/tracker` path contains information about whether our hmwk service has yet to populate the `hmwk_completion_tracking` board for a given homework assignment.

The entire unique primary key for a homework assignment is (`hmwkAssignmentsId`, `studentsId`, `hmwkCompletionTrackingId`, `itemId`), i.e. this key uniquely identifies a specific homework assignment that our hmwk service is supposed to "track".

| <div style="width:24ch">Key</div>                                                                                 | <div style="width:24ch">Values</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div style="width:24ch">`/tracker/${hmwkAssignmentsId},${studentsId},${hmwkCompletionTrackingId},${itemId}`</div> | `done`                               | A boolean (true/false) of whether or not `hmwk_completion_tracking` was successfully populated. In the beginning of a `/tracker/track` request for a new homework, this value is set to `false`. After successful population of the monday.com board, this is set to `true`. Future requests to the `/tracker/track` path will see that this value is `true` and thus won't trigger a redundant re-population. |

## `/submit`

`/submit` maps the homework assignment `hash` back to the (student, homework) pair. When generating a unique link (hash) for a (student, homework) pair, remember to insert the following key-value pair:

| <div style="width:24ch">Key</div> | <div style="width:24ch">Values</div> | Description                                                                    |
| --------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `/submit/${hash}`                 | `itemId`                             | Item ID of a (student, homework) pair in the `hmwk_completion_tracking` board. |
