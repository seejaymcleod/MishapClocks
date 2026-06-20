export const defaultScaledTiers = [
  {
    offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Singe', dc: 'DC 9', dice: '1d4' },
      { type: 'Mistarget', modifier: 'Glancing Veer' },
      { type: 'Multi-Target', modifier: 'Dual Fork' },
      { type: 'Close Range', modifier: 'Proximal Buzz' },
      { type: 'Anti-School', modifier: 'Minor Damp' },
      { type: 'Alter Environment', modifier: 'Surface Tilt' },
      { type: 'Zone', modifier: 'Minor Ripple' },
      { type: 'Materia Leak', modifier: 'Ether Drip' }
    ]
  },
  {
    offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Blister', dc: 'DC 11', dice: '1d6' },
      { type: 'Mistarget', modifier: 'Wide Yaw' },
      { type: 'Multi-Target', modifier: 'Triple Cleave' },
      { type: 'Close Range', modifier: 'Aura Cling' },
      { type: 'Anti-School', modifier: 'Ward Tear' },
      { type: 'Alter Environment', modifier: 'Ground Shake' },
      { type: 'Zone', modifier: 'Static Field' },
      { type: 'Materia Leak', modifier: 'Mana Bleed' }
    ]
  },
  {
    offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Searing Flash', dc: 'DC 13', dice: '2d6' },
      { type: 'Mistarget', modifier: 'Stray Vector' },
      { type: 'Multi-Target', modifier: 'Quad Splinter' },
      { type: 'Close Range', modifier: 'Tactile Shock' },
      { type: 'Anti-School', modifier: 'Spell Dissolve' },
      { type: 'Alter Environment', modifier: 'Terrain Warp' },
      { type: 'Zone', modifier: 'Vortex Pull' },
      { type: 'Materia Leak', modifier: 'Essence Drain' }
    ]
  },
  {
    offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Searing Wave', dc: 'DC 15', dice: '3d6' },
      { type: 'Mistarget', modifier: 'Inverse Arc' },
      { type: 'Multi-Target', modifier: 'Chain Cascade' },
      { type: 'Close Range', modifier: 'Melee Bind' },
      { type: 'Anti-School', modifier: 'Inverse Surge' },
      { type: 'Alter Environment', modifier: 'Flora Spasm' },
      { type: 'Zone', modifier: 'Gravity Well' },
      { type: 'Materia Leak', modifier: 'Spell Fracture' }
    ]
  },
  {
    offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Meltdown', dc: 'DC 17', dice: '4d8' },
      { type: 'Mistarget', modifier: 'Mirror Target' },
      { type: 'Multi-Target', modifier: 'Omnipresence' },
      { type: 'Close Range', modifier: 'Point-Blank' },
      { type: 'Anti-School', modifier: 'School Nullify' },
      { type: 'Alter Environment', modifier: 'Weather Flare' },
      { type: 'Zone', modifier: 'Time Warp' },
      { type: 'Materia Leak', modifier: 'Conduit Rupture' }
    ]
  },
  {
    offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Inferno Rupture', dc: 'DC 19', dice: '5d8' },
      { type: 'Mistarget', modifier: 'Chaos Drift' },
      { type: 'Multi-Target', modifier: 'Cataclysmic Split' },
      { type: 'Close Range', modifier: 'Absolute Proximity' },
      { type: 'Anti-School', modifier: 'Antimagic Collapse' },
      { type: 'Alter Environment', modifier: 'Planar Rupture' },
      { type: 'Zone', modifier: 'Singularity' },
      { type: 'Materia Leak', modifier: 'Void Siphon' }
    ]
  }
];

export const mishapRulings = [
  // 0: Self-Harm
  [
    `<li><strong>Epicenter Caster (Singe):</strong> Caster takes minor singes or bruising. A superficial toll (e.g. singed hair or static jolt). No mechanical penalty other than base damage.</li>`,
    `<li><strong>Epicenter Caster (Blister):</strong> Caster suffers painful blistering or minor bleeding. Caster has disadvantage on their next physical check due to pain.</li>`,
    `<li><strong>Epicenter Caster (Searing Flash):</strong> Caster is briefly blinded or deafened until the end of their next turn.</li>`,
    `<li><strong>Epicenter Caster (Searing Wave):</strong> Caster is knocked prone and stunned until the start of their next turn.</li>`,
    `<li><strong>Epicenter Caster (Meltdown):</strong> Caster's skin and gear fuse with residue. Caster suffers disadvantage on all checks and saves for 1 hour, and their maximum HP is reduced by the damage taken until they finish a long rest.</li>`,
    `<li><strong>Epicenter Caster (Inferno Rupture):</strong> Caster's body undergoes a localized elemental rupture. Caster immediately falls to 0 HP and is dying. Any creature within Close range takes half the base damage.</li>`
  ],
  // 1: Mistarget
  [
    `<li><strong>Veering Path (Glancing Veer):</strong> Minor trajectory deflection. If another creature is within 5 ft of the path, they become the target.</li>`,
    `<li><strong>Veering Path (Wide Yaw):</strong> Wild deflection. Roll randomly among all targets within 15 ft of the original target (including allies) to determine who is hit.</li>`,
    `<li><strong>Veering Path (Stray Vector):</strong> Complete miss. The spell strikes a random creature within Near range (30 ft), prioritizing closest allies/neutrals.</li>`,
    `<li><strong>Veering Path (Inverse Arc):</strong> Spell curves backward. The caster becomes the target of the spell, making the save with disadvantage.</li>`,
    `<li><strong>Veering Path (Mirror Target):</strong> Spell splits. It strikes two random unintended targets within Near range, prioritizing caster's closest allies.</li>`,
    `<li><strong>Veering Path (Chaos Drift):</strong> Chaotic chain reaction. The spell strikes the caster, then jumps to the nearest ally, then to the next, up to 5 targets.</li>`
  ],
  // 2: Multi-Target
  [
    `<li><strong>Violent Split (Dual Fork):</strong> Minor split. The spell strikes 1 additional random nearby target.</li>`,
    `<li><strong>Violent Split (Triple Cleave):</strong> Forked path. The spell strikes the target and 2 random nearby creatures.</li>`,
    `<li><strong>Violent Split (Quad Splinter):</strong> Four-way split. If fewer than 4 targets, the remaining paths hit the environment, creating local hazards.</li>`,
    `<li><strong>Violent Split (Chain Cascade):</strong> Arc cascade. The mishap strikes the target and then jumps to all creatures within 15 ft.</li>`,
    `<li><strong>Violent Split (Omnipresence):</strong> Encounter-wide surge. The mishap strikes all creatures (allies, enemies, caster) within Near range.</li>`,
    `<li><strong>Violent Split (Cataclysmic Split):</strong> Loop bifurcation. Strikes every creature in the encounter and duplicates itself, triggering a secondary random T1 mishap.</li>`
  ],
  // 3: Close Range
  [
    `<li><strong>Proximal Backlash (Proximal Buzz):</strong> Minor static discharge. Adjacent creatures (within 5 ft) feel a brief jolt; no mechanical penalty.</li>`,
    `<li><strong>Proximal Backlash (Aura Cling):</strong> Sticky elemental aura. Any creature entering or starting their turn within Close range (10 ft) of the caster takes 1d6 damage. Lasts 3 rounds.</li>`,
    `<li><strong>Proximal Backlash (Tactile Shock):</strong> Concussive wave. All creatures within 10 ft of the caster are knocked back 10 ft and knocked prone (DEX save resists).</li>`,
    `<li><strong>Proximal Backlash (Melee Bind):</strong> Arcane tether. Caster is bound to all adjacent creatures; they are anchored (speed 0) and take damage at the start of their turns for 3 rounds.</li>`,
    `<li><strong>Proximal Backlash (Point-Blank):</strong> Spell detonation. Everything within 20 ft of the caster takes full damage and is knocked prone.</li>`,
    `<li><strong>Proximal Backlash (Absolute Proximity):</strong> Implosive collapse. Everyone within 30 ft of the caster takes full damage, is blinded for 1 minute, and is pulled 15 ft toward the caster.</li>`
  ],
  // 4: Anti-School
  [
    `<li><strong>Spell Dampening (Minor Damp):</strong> Spell dampening. Spells of this school cast by the caster on their next turn have their DC reduced by 2.</li>`,
    `<li><strong>Spell Dampening (Ward Tear):</strong> Ward disruption. Caster's magical wards and active spells of this school are immediately dispelled.</li>`,
    `<li><strong>Spell Dampening (Spell Dissolve):</strong> Local nullification. All active spells within 30 ft are dispelled; caster cannot cast spells of the mishap school for 10 minutes.</li>`,
    `<li><strong>Spell Dampening (Inverse Surge):</strong> Item overload. Active magic items on the caster are deactivated for 1 hour; caster cannot cast any spells for 3 rounds.</li>`,
    `<li><strong>Spell Dampening (School Nullify):</strong> Permanent blocking. The caster's ability to cast spells of this school is permanently blocked until they receive a Remove Curse spell.</li>`,
    `<li><strong>Spell Dampening (Antimagic Collapse):</strong> Full shutdown. A localized antimagic field (30 ft radius) centers on the caster and lasts for 1 hour, neutralizing all magic, spells, and items.</li>`
  ],
  // 5: Alter Environment
  [
    `<li><strong>Terrain Warping (Surface Tilt):</strong> Minor shift. Floor tilts slightly; immediate 10 ft radius becomes difficult terrain until the end of the round.</li>`,
    `<li><strong>Terrain Warping (Ground Shake):</strong> Ground trembles; all creatures within 15 ft must succeed on a DEX check or fall prone.</li>`,
    `<li><strong>Terrain Warping (Terrain Warp):</strong> Permanent warping. Creates difficult terrain (spikes, mud, ice, or rubble) in a 15 ft radius.</li>`,
    `<li><strong>Terrain Warping (Environmental Hazard):</strong> Hazards erupt (shards, boiling tar, toxic vines). Moving through the 25 ft radius area deals 1d6 damage per 5 ft moved.</li>`,
    `<li><strong>Terrain Warping (Weather Flare):</strong> Atmospheric chaos. Fog, extreme heat, or freezing gale fills the room (50 ft radius), causing total concealment and dealing 1d8 damage to everyone at the start of their turn.</li>`,
    `<li><strong>Terrain Warping (Planar Rupture):</strong> Rift opens. Ground collapses into a pit; lava, absolute cold, or void wind fills the chamber, dealing 3d6 damage per round to everyone inside.</li>`
  ],
  // 6: Zone
  [
    `<li><strong>Lingering Hazard (Minor Ripple):</strong> Localized warping. Shimmering field; ranged attacks passing through it have disadvantage for 1 round.</li>`,
    `<li><strong>Lingering Hazard (Static Field):</strong> Force dome. A 15 ft radius static dome forms for 3 rounds; ranged attacks cannot cross it, and moving through it requires a STR check.</li>`,
    `<li><strong>Lingering Hazard (Vortex Pull):</strong> Singularity pull. Gravitational anomaly pulls all creatures in a 15 ft radius 10 ft toward the center, dealing 1d6 damage. Lasts 3 rounds.</li>`,
    `<li><strong>Lingering Hazard (Gravity Well):</strong> Gravity shift. All creatures in a 20 ft radius are crushed (speed halved, take 2d6 damage) or float helplessly. Lasts 5 rounds.</li>`,
    `<li><strong>Lingering Hazard (Time Warp):</strong> Temporal bubble. Speed is slowed or speeded up randomly; spells are suspended in mid-air and fire when the zone ends. Lasts 5 rounds.</li>`,
    `<li><strong>Lingering Hazard (Singularity):</strong> Black hole. Pulls all creatures within 60 ft toward the center (30 ft pull per round); starting turn adjacent to center deals 6d6 damage. Lasts 3 rounds.</li>`
  ],
  // 7: Materia Leak
  [
    `<li><strong>Ethereal Drain (Ether Drip):</strong> Minor leak. Caster loses their next lowest level spell slot.</li>`,
    `<li><strong>Ethereal Drain (Mana Bleed):</strong> Feedback leak. Every time they cast a spell in the next 10 minutes, they take 1d6 damage per spell level.</li>`,
    `<li><strong>Ethereal Drain (Essence Drain):</strong> Critical drain. Caster loses their highest level spell slot, and all active magic items on their person lose 1 charge.</li>`,
    `<li><strong>Ethereal Drain (Spell Fracture):</strong> Broken connection. Spells cast have a 50% chance of failing and triggering another random T1 mishap. Lasts 1 hour.</li>`,
    `<li><strong>Ethereal Drain (Conduit Rupture):</strong> Arcane eruption. Caster loses all remaining spell slots; any creature touching them takes 3d6 force damage.</li>`,
    `<li><strong>Ethereal Drain (Void Siphon):</strong> Necrotic drain. Caster drains 1d4 spell slots/charges from everyone within 30 ft at the start of their turn, taking 1d10 necrotic damage per slot/charge drained. Lasts 3 rounds.</li>`
  ]
];
